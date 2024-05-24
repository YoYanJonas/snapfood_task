FROM node:18.20.3-buster

ARG USER=node 

ARG PASSWD=1234

# set password for node and add it to sudoers
RUN echo $USER:$PASSWD | chpasswd \ 
    && usermod -a -G sudo $USER

# install git dependencies and usefull 
RUN apt-get update && apt-get upgrade -y && apt-get install --no-install-recommends -y \
    dh-autoreconf libcurl4-gnutls-dev libexpat1-dev \
    gettext libz-dev libssl-dev asciidoc xmlto docbook2x install-info \
    netcat \
    vim \
    sudo \
    nano \
    zsh \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /usr/src/app && chown -R $USER:$USER /usr/src/app

WORKDIR /usr/src/app


RUN chsh --shell /usr/bin/zsh $USER

USER $USER

# installing ohmyzsh and plugins
RUN sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"


ENTRYPOINT [ "./entrypoint.sh" ]