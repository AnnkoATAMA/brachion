FROM oven/bun:latest

WORKDIR /front

COPY package.json bun.lockb ./

RUN bun install

COPY . .

CMD ["bun", "run", "dev"]
