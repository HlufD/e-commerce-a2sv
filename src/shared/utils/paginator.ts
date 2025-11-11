export interface PaginatedResponse<T> {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  data: T[];
}

export class Paginator {
  static async paginate<T>(
    getItems: (skip: number, take: number) => Promise<T[]>,
    getTotalCount: () => Promise<number>,
    page = 1,
    pageSize = 10,
  ): Promise<PaginatedResponse<T>> {
    const skip = (page - 1) * pageSize;

    const [items, totalItems] = await Promise.all([
      getItems(skip, pageSize),
      getTotalCount(),
    ]);

    return {
      currentPage: page,
      pageSize,
      totalPages: Math.ceil(totalItems / pageSize),
      totalItems,
      data: items,
    };
  }
}
