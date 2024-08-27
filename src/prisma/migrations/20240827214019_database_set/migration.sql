-- CreateTable
CREATE TABLE "posts" (
    "id" UUID NOT NULL,
    "post_name" VARCHAR(255) NOT NULL,
    "post_content" TEXT NOT NULL,
    "owner" UUID,
    "post_timestamp" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255),
    "password" VARCHAR(255) NOT NULL,
    "refresh_token" VARCHAR(255),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_owner_fkey" FOREIGN KEY ("owner") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
