FROM ruby:2.4-alpine
MAINTAINER tyage <namatyage@gmail.com>

ARG SRCDIR="/usr/local/slack-patron"

RUN set -x && \
	apk upgrade --update && \
	apk add --update \
		build-base \
		openssl \
		openssl-dev && \
	echo 'gem: --no-document' >> /etc/gemrc && \
	wget https://github.com/vishnubob/wait-for-it/raw/master/wait-for-it.sh

COPY Gemfile ${SRCDIR}/
COPY Gemfile.lock ${SRCDIR}/

WORKDIR ${SRCDIR}

RUN bundle install

CMD bash wait-for-it.sh -t 0 mongo:27017 -- bash wait-for-it.sh -t 0 elasticsearch:9200 -- bundle exec ruby logger/logger.rb
