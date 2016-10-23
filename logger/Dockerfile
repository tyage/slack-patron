FROM ruby:2.3-alpine
MAINTAINER tyage <namatyage@gmail.com>

ARG REPOSITORY="https://github.com/tyage/slack-patron.git"
ARG BRANCH="docker"
ARG SRCDIR="/usr/local/slack-patron"

RUN set -x \
	apk upgrade --update && \
	apk add --update \
		git \
		build-base \
		openssl && \
	echo 'gem: --no-document' >> /etc/gemrc && \
	git clone ${REPOSITORY} ${SRCDIR} && \
	cd ${SRCDIR} && \
	git checkout ${BRANCH} && \
	bundle install

COPY ./config.yml ${SRCDIR}/config.yml
WORKDIR ${SRCDIR}

CMD bundle exec ruby logger/logger.rb && tail -f logs/sidekiq.log
