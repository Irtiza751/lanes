export class Utils {
  static groupBy<T>(
    iterable: T[],
    callback: (item: T) => string,
  ): Record<string, T[]> {
    return iterable.reduce(
      (acc, item) => {
        const key = callback(item);
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(item);
        return acc;
      },
      {} as Record<string, T[]>,
    );
  }
}
