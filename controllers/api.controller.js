export const api = ((req, res) => {
  res.json({
    roomItems: {
      numComps: 11,
      amiibo: [
        "marth",
        "roy",
        "ike",
        "lucina",
        "robin",
        "corrin, p2 variant",
        "chrom"
      ],
      ventusdesktopMKIII: {
        specs: {
          CPU: "Ryzen R9 3900X",
          RAM: "32 GB @ 3600Mhz",
          GPU: "Radeon RX 5700 XT",
          Storage: "6.5 TB 2 SSDs, 3 HDDs",
          PSU: "Corsair CX 750M",
          MotherBoard: "ASUS TUF Gaming 570X Plus WiFi",
          OS: "Windows 10 Pro",
        },
        Peripherals: {
          mouse: "Logitech G502",
          keyboard: "Logitech G513 Carbon (GX Brown)",
          monitors: {
            monitor1: "LG 27\" 4k with FreeSync",
            monitor2: "Samsung 27\" 1440p"
          }
        }
      }
    }
  })
})