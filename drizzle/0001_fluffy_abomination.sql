ALTER TABLE "transactions" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "type" "transaction_type" DEFAULT 'income' NOT NULL;