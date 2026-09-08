import Link from "next/link";
import "@/app/brand.css";
import "@/components/brand/editorial-site.css";

export const metadata = { title: "Photography credits" };
export default function ImageCredits() {
  return (
    <main className="editorial-site" style={{ minHeight: "100vh", padding: "60px 24px" }}>
      <div style={{ maxWidth: 720, margin: "auto" }}>
        <Link href="/" style={{ fontSize: 12 }}>
          ← Back to Taiuo
        </Link>
        <h1 style={{ fontSize: 56, margin: "30px 0 20px" }}>Photography credits.</h1>
        <p style={{ fontSize: 14, lineHeight: 1.8 }}>
          Our editorial photography is sourced from the photographers below under the{" "}
          <a href="https://www.pexels.com/license/" style={{ textDecoration: "underline" }}>
            Pexels License
          </a>
          . Images illustrate the world of personal care. The people shown are not represented as
          Taiuo customers, and photographed products are not a Taiuo product line or a promise of
          catalog availability.
        </p>
        <ul style={{ margin: "30px 0", paddingLeft: 20, fontSize: 14, lineHeight: 2.6 }}>
          <li>
            <a href="https://www.pexels.com/photo/a-man-in-brown-crew-neck-shirt-with-wavy-hair-10204124/">
              Men’s portrait — cottonbro studio
            </a>
          </li>
          <li>
            <a href="https://www.pexels.com/photo/model-posing-against-a-beige-background-13543840/">
              Women’s portrait — Luis Rodriguez
            </a>
          </li>
          <li>
            <a href="https://www.pexels.com/photo/cosmetic-product-in-a-brown-glass-container-7796975/">
              Skincare still-life — Alesia Kozik
            </a>
          </li>
          <li>
            <a href="https://www.pexels.com/photo/close-up-shot-of-a-glass-perfume-bottle-11711811/">
              Fragrance still-life — Anis Salmani
            </a>
          </li>
          <li>
            <a href="https://www.pexels.com/photo/a-person-holding-a-bottle-and-a-dropper-6847878/">
              Serum ritual — Misolo Cosmetic
            </a>
          </li>
        </ul>
      </div>
    </main>
  );
}
