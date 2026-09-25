FROM node:22-slim

WORKDIR /app

# Keep the development container running so npm commands can be executed in it.
CMD ["tail", "-f", "/dev/null"]
