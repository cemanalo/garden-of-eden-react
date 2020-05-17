COMPOSE_RUN_APP = docker-compose run --rm -p 3000:3000 --name garden-of-eden-react webapp
DEPS_DIRS = node_modules
DEPS_ARTIFACT = $(DEPS_DIRS).tar.gz
COMPOSE_RUN = docker-compose run --rm webapp
COMPOSE_AWSCLI = docker-compose run --rm awscli

deps:
	make _deps

depsPack:
	$(COMPOSE_RUN_APP) make _depsPack

depsUnpack:
	$(COMPOSE_RUN_APP) make _depsUnpack

envfile:
	@echo "Create .env with $(ENVFILE)"
	cp $(ENVFILE) .env

start:
	$(COMPOSE_RUN_APP) make _start

build:
	$(COMPOSE_RUN) make _build

clean:
	$(COMPOSE_RUN) make _clean

deploy:
	$(COMPOSE_AWSCLI) s3 sync . s3://gardenofeden.com

deployQa:
	make clean envfile ENVFILE=env.qa build deploy

stop:
	docker stop garden-of-eden-react

_deps:
	yarn install

_depsPack:
	rm -f $(DEPS_ARTIFACT)
	tar -czf $(DEPS_ARTIFACT) $(DEPS_DIRS)

_depsUnpack: $(DEPS_ARTIFACT)
	rm -fr $(DEPS_DIRS)
	tar -xzf $(DEPS_ARTIFACT)

_start:
	yarn start

_build:
	yarn build

_clean:
	rm -rf build/

_deploy:
	s3 sync . s3://gardenofeden.com