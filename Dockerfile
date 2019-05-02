FROM ubuntu:18.04

# ENV ENABLE_XVBF=true

# Dependencies + NodeJS
RUN apt-get update && \
  echo "ttf-mscorefonts-installer msttcorefonts/accepted-mscorefonts-eula select true" | debconf-set-selections && \
  apt-get install -y software-properties-common &&\
  apt-add-repository "deb http://archive.canonical.com/ubuntu $(lsb_release -sc) partner" && \
  apt-add-repository ppa:malteworld/ppa && apt-get update && apt-get install -y \
  adobe-flashplugin \
  msttcorefonts \
  fonts-noto-color-emoji \
  fonts-noto-cjk \
  fonts-liberation \
  fonts-thai-tlwg \
  fontconfig \
  libappindicator3-1 \
  pdftk \
  unzip \
  locales \
  gconf-service \
  libasound2 \
  libatk1.0-0 \
  libc6 \
  libcairo2 \
  libcups2 \
  libdbus-1-3 \
  libexpat1 \
  libfontconfig1 \
  libgcc1 \
  libgconf-2-4 \
  libgdk-pixbuf2.0-0 \
  libglib2.0-0 \
  libgtk-3-0 \
  libnspr4 \
  libpango-1.0-0 \
  libpangocairo-1.0-0 \
  libstdc++6 \
  libx11-6 \
  libx11-xcb1 \
  libxcb1 \
  libxcomposite1 \
  libxcursor1 \
  libxdamage1 \
  libxext6 \
  libxfixes3 \
  libxi6 \
  libxrandr2 \
  libxrender1 \
  libxss1 \
  libxtst6 \
  ca-certificates \
  libappindicator1 \
  libnss3 \
  lsb-release \
  xdg-utils \
  wget \
  xvfb \
  curl &&\
  # Install Node
  curl --silent --location https://deb.nodesource.com/setup_10.x | bash - &&\
  apt-get install --yes nodejs &&\
  apt-get install --yes build-essential &&\
  # Fonts
  fc-cache -f -v

# It's a good idea to use dumb-init to help prevent zombie chrome processes.
ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

# Cleanup ubuntu instalations
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*


ENV NODE_ENV=production

# Configuration for Chrome
# ENV CONNECTION_TIMEOUT=60000

ENV application_directory=/usr/src/node-red

RUN mkdir -p $application_directory

RUN mkdir /data

WORKDIR $application_directory

# Add node-red user so we aren't running as root.
#RUN adduser -h /usr/src/node-red -D -H node-red \
#    && chown -R node-red:node-red /data \
#    && chown -R node-red:node-red /usr/src/node-red

# Install app dependencies
COPY package.json .

# Bundle app source
COPY . .

# Build
#ENV NPM_CONFIG_LOGLEVEL warn
#RUN npm run build
  # &&\
  # npm prune --production

# Add user
RUN groupadd -r blessuser && useradd -r -g blessuser -G audio,video blessuser \
  && mkdir -p /home/blessuser/Downloads \
  && chown -R blessuser:blessuser /home/blessuser \
  && chown -R blessuser:blessuser /data \
  && chown -R blessuser:blessuser $application_directory

# Run everything after as non-privileged user.
USER blessuser

# Show current folder structure in logs
# RUN ls -al -R

# Expose the web-socket and HTTP ports
VOLUME ["/data"]
EXPOSE 1880
ENTRYPOINT ["dumb-init", "--"]

# Environment variable holding file path for flows configuration
ENV FLOWS=flows.json

HEALTHCHECK --interval=10s --timeout=2s --start-period=15s \
    CMD node ./healthcheck.js

CMD [ "node", "./index.js" ]