FROM mongo:4.4.2

RUN apt-get update -y && \
	apt-get install wget zip curl -y && \
	cd /tmp && \
	wget https://github.com/rwynn/monstache/releases/download/v6.7.3/monstache-b9dcddc.zip && \
	unzip monstache-b9dcddc.zip && \
	mv build/linux-amd64/monstache /bin && \
	wget https://github.com/vishnubob/wait-for-it/raw/master/wait-for-it.sh -O /wait-for-it.sh && \
	chmod +x /wait-for-it.sh && \
	apt-get purge wget zip -y && \
	apt-get autoremove -y && \
	apt-get clean && \
	rm -rf /var/lib/apt/lists/* /tmp/*

COPY run.sh .
COPY monstache.toml .

ENTRYPOINT /wait-for-it.sh mongo:27017 -t 0 -- /wait-for-it.sh elasticsearch:9200 -t 0 -- bash run.sh
