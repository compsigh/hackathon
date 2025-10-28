import Image from "next/image";

const galleryImages = [
  "ash.jpg",
  "brookshands.jpg",
  "candidgroup.jpg",
  "celebration.jpg",
  "coding.jpg",
  "codinghard.jpg",
  "g.jpg",
  "globe.jpg",
  "groupbloom.jpg",
  "groupdeploy.jpg",
  "ilceoveralex.jpg",
  "judingdev.jpg",
  "jumpingcelebration.jpg",
  "kianajetmap.jpg",
  "laughing.jpg",
  "moodjudging.jpg",
  "noradj.jpg",
  "peace.jpg",
  "sillypicture.jpg",
  "sunlitcoding.jpg",
  "synthesiakiana.jpg",
].slice(0, 21); // Limit to 21 images (7 per column × 3 columns)

export function PhotoGrid() {
  return (
    <div
      className="overflow-hidden rounded-lg"
      style={
        {
          lineHeight: 0,
          columnCount: 3,
          columnGap: 0,
          WebkitColumnCount: 3,
          WebkitColumnGap: 0,
          MozColumnCount: 3,
          MozColumnGap: 0,
        } as React.CSSProperties
      }
    >
      {galleryImages.map((image, index) => (
        <div key={index} className="mb-0 break-inside-avoid">
          <a
            href={`/gallery/${image}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block no-underline"
          >
            <Image
              src={`/gallery/${image}`}
              alt={`Gallery photo ${index + 1}`}
              width={400}
              height={300}
              className="block h-auto w-full"
            />
          </a>
        </div>
      ))}
    </div>
  );
}
