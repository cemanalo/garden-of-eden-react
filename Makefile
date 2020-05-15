COMPOSE_RUN_APP = docker-compose run --rm -p 3000:3000 webapp
DEPS_DIRS = node_modules
DEPS_ARTIFACT = $(DEPS_DIRS).tar.gz

deps:
	make _depsNpmInstall

depsPack:
	$(COMPOSE_RUN_APP) make _depsPack

depsUnpack:
	$(COMPOSE_RUN_APP) make _depsUnpack

envfile:
	@echo "Create .env with $(ENVFILE)"
	cp $(ENVFILE) .env

start:
	$(COMPOSE_RUN_APP) make _depsNpmInstall _start

stop:
	docker-compose down webapp --remove-orphans

_depsNpmInstall:
	yarn install

_depsPack:
	rm -f $(DEPS_ARTIFACT)
	tar -czf $(DEPS_ARTIFACT) $(DEPS_DIRS)

_depsUnpack: $(DEPS_ARTIFACT)
	rm -fr $(DEPS_DIRS)
	tar -xzf $(DEPS_ARTIFACT)

_start:
	yarn start