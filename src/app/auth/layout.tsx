import AuthAppbar from "@/components/AuthAppbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AuthAppbar />
      {children}
    </div>
  );
}
