import UmamiAnalytics from "./umami";

export default function Analytics() {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <>
      <UmamiAnalytics />
    </>
  );
}
