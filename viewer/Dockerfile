FROM ruby:2.7.2-alpine
LABEL maintainer="namatyage@gmail.com"

ARG SRCDIR="/usr/local/slack-patron"

RUN set -x && \
	apk upgrade --update && \
	apk add --update \
	build-base \
	openssl \
	nodejs \
	nodejs-npm && \
	echo 'gem: --no-document' >> /etc/gemrc

WORKDIR ${SRCDIR}

COPY Gemfile ${SRCDIR}/
COPY Gemfile.lock ${SRCDIR}/
RUN bundle install

COPY viewer/ ${SRCDIR}/viewer/
RUN ./viewer/setup.sh

COPY ./ ${SRCDIR}/

CMD bundle exec puma viewer/config.ru -C viewer/puma.rb -p 9292

EXPOSE 9292
