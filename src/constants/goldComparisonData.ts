// goldComparisonData.ts

// ✅ Define reusable type
export interface PackageComparisonData {
  baseVersion: string;
  goldVersion: string;
  overview: {
    supplierIssues: string[];
    usage: {
      name: string;
      version: string;
      org: string;
      product: string;
    }[];
  };
  riskGraph: {
    base: { compliance: string; tamperability: string };
    gold: { compliance: string; tamperability: string };
  };
  dependencies: {
    base: {
      name: string;
      version: string;
      type: string;
      status: string;
    }[];
    gold: {
      name: string;
      version: string;
      type: string;
      status: string;
    }[];
  };
  vulnerabilities: {
    base: {
      total: number;
      counts: {
        critical: number;
        high: number;
        medium: number;
        low: number;
      };
      list: {
        id: string;
        severity: string;
      }[];
    };
    gold: {
      total: number;
      counts: {
        critical: number;
        high: number;
        medium: number;
        low: number;
      };
      list: {
        id: string;
        severity: string;
      }[];
    };
  };
}

// ✅ Export with dynamic key type (Record<string, PackageComparisonData>)
export const goldComparisonData: Record<string, PackageComparisonData> = {
  "npmcli:fs": {
    baseVersion: "2.5.2",
    goldVersion: "2.5.7",
    overview: {
      supplierIssues: [
        "Supplier and License",
        "Well maintained & Supported",
        "Malware",
        "Secrets"
      ],
      usage: [
        {
          name: "Keycloak",
          version: "3.6.0",
          org: "App Team",
          product: "Product One"
        },
        {
          name: "Django",
          version: "1.1.7",
          org: "App Team",
          product: "Product One"
        }
      ]
    },
    riskGraph: {
      base: { compliance: "Not Compliant", tamperability: "Unattested" },
      gold: { compliance: "Compliant", tamperability: "Attested" }
    },
    dependencies: {
      base: [
        { name: "aiosignal", version: "1.1.3", type: "Direct", status: "warning" },
        { name: "aiohttp", version: "3.11.4", type: "Direct", status: "warning" }
      ],
      gold: [
        { name: "aiosignal", version: "1.3.2", type: "Direct", status: "safe" },
        { name: "aiohttp", version: "3.11.18", type: "Direct", status: "safe" }
      ]
    },
    vulnerabilities: {
      base: {
        total: 18,
        counts: { critical: 3, high: 3, medium: 5, low: 7 },
        list: [
          { id: "CVE-2021-1234", severity: "Critical" },
          { id: "CVE-2021-5678", severity: "Critical" }
        ]
      },
      gold: {
        total: 8,
        counts: { critical: 0, high: 0, medium: 3, low: 5 },
        list: [
          { id: "CVE-2021-1234", severity: "Medium" },
          { id: "CVE-2021-5678", severity: "Medium" }
        ]
      }
    }
  },
  "axios:http": {
  baseVersion: "1.6.2",
  goldVersion: "1.6.5",
  overview: {
    supplierIssues: ["License issues", "No malware found"],
    usage: [
      { name: "MyApp", version: "1.0.0", org: "Platform Team", product: "UI Shell" }
    ]
  },
  riskGraph: {
    base: { compliance: "Not Compliant", tamperability: "Unattested" },
    gold: { compliance: "Compliant", tamperability: "Attested" }
  },
  dependencies: {
    base: [
      { name: "follow-redirects", version: "1.14.9", type: "Direct", status: "warning" }
    ],
    gold: [
      { name: "follow-redirects", version: "1.15.0", type: "Direct", status: "safe" }
    ]
  },
  vulnerabilities: {
    base: {
      total: 5,
      counts: { critical: 0, high: 2, medium: 2, low: 1 },
      list: [
        { id: "CVE-2022-1234", severity: "High" },
        { id: "CVE-2022-5678", severity: "Medium" }
      ]
    },
    gold: {
      total: 1,
      counts: { critical: 0, high: 0, medium: 1, low: 0 },
      list: [
        { id: "CVE-2022-5678", severity: "Medium" }
      ]
    }
  }
}

};
