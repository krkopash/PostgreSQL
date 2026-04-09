#include <stdio.h>
#include "postgres.h"
#include "fmgr.h"

PG_MODULE_MAGIC;

PG_FUNCTION_INFO_V1(log_transfer);

Datum log_transfer(PG_FUNCTION_ARGS) {
    int sender = PG_GETARG_INT32(0);
    int receiver = PG_GETARG_INT32(1);
    float amount = PG_GETARG_FLOAT8(2);

    FILE *file = fopen("/tmp/transactions.txt", "a");

    if (file == NULL) {
        elog(ERROR, "Could not open file");
    }

    fprintf(file, "Sender: %d, Receiver: %d, Amount: %.2f\n",
            sender, receiver, amount);

    fclose(file);

    PG_RETURN_VOID();
}