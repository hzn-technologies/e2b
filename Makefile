update-api-spec:
	@echo "Updating API spec"
	@./scripts/update-api-spec.sh
	@echo "Done"


generate:
	cd packages/python-sdk && make generate
	cd packages/js-sdk && pnpm generate && pnpm generate-envd-api
	cd packages/connect-python && make bin/protoc-gen-connect-python
	cd spec/envd && buf generate && cd ../../packages/python-sdk && ./scripts/fix-python-pb.sh
