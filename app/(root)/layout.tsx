import React from "react";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div>
        <section>
          <div>{children}</div>
        </section>
      </div>
    </main>
  );
};

export default Layout;
