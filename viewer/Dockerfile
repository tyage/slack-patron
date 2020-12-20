FROM ruby:2.7.2-alpine
MAINTAINER tyage <namatyage@gmail.com>

ARG SRCDIR="/usr/local/slack-patron"

RUN set -x && \
	apk upgrade --update && \
	apk add --update \
		build-base \
		openssl \
		nodejs \
		nodejs-npm && \
	echo 'gem: --no-document' >> /etc/gemrc

COPY Gemfile ${SRCDIR}/
COPY Gemfile.lock ${SRCDIR}/

WORKDIR ${SRCDIR}

RUN bundle install

CMD ./viewer/setup.sh && bundle exec puma viewer/config.ru -C viewer/puma.rb -p 9292

EXPOSE 9292
