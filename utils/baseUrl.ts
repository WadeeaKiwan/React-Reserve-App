const baseUrl: string =
  process.env.NODE_ENV === "production"
    ? "https://react-reserve-app.wadeeakiwan.vercel.app"
    : "http://localhost:3000";

export default baseUrl;
