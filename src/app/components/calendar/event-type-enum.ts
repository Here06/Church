export enum EventType {
  SundaySchool = "Sunday School",
  Youth = "Youth",
  General = "General",
  Women = "Women",
  Men = "Men",
  Branch = "Branch",
}


export function mapToEventType(typeStr: string): EventType | undefined {
  const normalized = typeStr.trim().toLowerCase();

  return Object.values(EventType).find(
    (value) => value.toLowerCase() === normalized
  );
}



