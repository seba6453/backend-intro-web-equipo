interface UpdateResult {
    acknowledged: boolean;
    modifiedCount: number;
    upsertedId: null | any;  // Puedes cambiar 'any' por el tipo específico del id si lo conoces
    upsertedCount: number;
    matchedCount: number;
  }