import React from "react";
import type { Viewport } from "next";
import { FaMastodon, FaGithub } from "react-icons/fa";
import { lora } from "../src/fonts";
import "./global.css";

export const viewport: Viewport = {
  width: 320,
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${lora.variable}`}>
      <body>
        <main>{children}</main>
        <footer>
          <div className="thanks">
            <p>Wanna say thanks?</p>
            <a href="https://www.buymeacoffee.com/mosswood" target="_blank">
              <img
                width={217}
                height={60}
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                alt="Buy Me A Coffee"
              />
            </a>
          </div>
          <div className="consulting">
            Wanna do fancy stuff on the Web?
            <br />
            I’m available for consulting, just{" "}
            <a href="https://brianbeck.com">get in touch!</a>
          </div>
          <nav>
            <ul>
              <li>
                <a
                  href="https://hachyderm.io/@exogen"
                  rel="noopener"
                  aria-label="exogen on Hachyderm"
                  title="exogen on Hachyderm"
                >
                  <FaMastodon className="icon" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/exogen"
                  rel="noopener"
                  aria-label="exogen on GitHub"
                  title="exogen on GitHub"
                >
                  <FaGithub className="icon" />
                </a>
              </li>
            </ul>
          </nav>
        </footer>
      </body>
    </html>
  );
}
