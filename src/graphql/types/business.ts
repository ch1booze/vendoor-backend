export interface CreateBusinessInput {
  name: string;
  description?: string;
}

export interface UpdateBusinessInput {
  name?: string;
  description?: string;
}
