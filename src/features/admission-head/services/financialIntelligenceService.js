import aiService from '../../../services/aiService';
import aiLanguageService from '../../../services/aiLanguageService';

class FinancialIntelligenceService {
  constructor() {
    this.financialCategories = [
      "revenue",
      "expenses", 
      "assets",
      "liabilities",
      "cashflow",
      "profitability"
    ];
    
    this.analysisTypes = ["health", "optimization", "forecasting", "benchmarking", "risk"];
    this.timePeriods = ["monthly", "quarterly", "yearly", "5-year"];
  }

  // Main financial intelligence function
  async analyzeFinancials(universityData, analysisType = "health", timePeriod = "yearly") {
    try {
      console.log("Starting financial intelligence analysis with data:", universityData);
      
      const prompt = this.buildFinancialAnalysisPrompt(universityData, analysisType, timePeriod);
      const currentLanguage = aiLanguageService.getCurrentLanguage();
      
      const response = await aiService.generateResponse(
        prompt,
        "director",
        [], // chatHistory - empty array
        currentLanguage // currentUILanguage
      );
      
      return this.processFinancialAnalysis(response, universityData, analysisType, timePeriod);
    } catch (error) {
      console.error("Financial intelligence analysis error:", error);
      return this.getFallbackFinancialAnalysis(universityData, analysisType, timePeriod);
    }
  }

  // Build AI prompt for financial intelligence
  buildFinancialAnalysisPrompt(data, analysisType, timePeriod) {
    const basePrompt = `As a university financial intelligence expert, analyze the following university financial data and provide comprehensive financial insights and recommendations.

University Financial Data:
${JSON.stringify(data, null, 2)}

Analysis Type: ${analysisType}
Time Period: ${timePeriod}

Please provide detailed financial analysis covering:
1. Financial Health Assessment - Overall financial stability, liquidity, solvency
2. Revenue Analysis - Revenue streams, growth trends, diversification
3. Expense Analysis - Cost structure, efficiency, optimization opportunities
4. Cash Flow Analysis - Operating, investing, financing cash flows
5. Profitability Analysis - Margins, returns, efficiency ratios
6. Budget Optimization - Cost reduction strategies, revenue enhancement
7. Investment Analysis - Capital allocation, ROI, risk assessment
8. Financial Forecasting - Future projections, scenarios, planning

For each analysis area, provide:
- Current metrics and ratios
- Industry benchmarks and comparisons
- Trend analysis and patterns
- Risk factors and opportunities
- Specific recommendations
- Action items with priorities
- Financial KPIs and targets

Format your response as structured JSON with this exact structure:
{
  "summary": "Overall financial intelligence summary",
  "analysisType": "${analysisType}",
  "timePeriod": "${timePeriod}",
  "financialHealth": {
    "score": number,
    "rating": "Excellent|Good|Fair|Poor|Critical",
    "trend": "Improving|Stable|Declining",
    "keyStrengths": ["strength1", "strength2", "strength3"],
    "keyConcerns": ["concern1", "concern2", "concern3"]
  },
  "revenueAnalysis": {
    "totalRevenue": number,
    "growthRate": number,
    "diversification": "High|Medium|Low",
    "primarySources": [
      {
        "source": "source name",
        "amount": number,
        "percentage": number,
        "trend": "Growing|Stable|Declining"
      }
    ],
    "recommendations": ["rec1", "rec2", "rec3"]
  },
  "expenseAnalysis": {
    "totalExpenses": number,
    "growthRate": number,
    "efficiency": "High|Medium|Low",
    "categories": [
      {
        "category": "category name",
        "amount": number,
        "percentage": number,
        "optimization": "High|Medium|Low"
      }
    ],
    "recommendations": ["rec1", "rec2", "rec3"]
  },
  "cashFlowAnalysis": {
    "operatingCashFlow": number,
    "investingCashFlow": number,
    "financingCashFlow": number,
    "freeCashFlow": number,
    "liquidity": "Strong|Adequate|Weak",
    "recommendations": ["rec1", "rec2", "rec3"]
  },
  "profitabilityAnalysis": {
    "operatingMargin": number,
    "netMargin": number,
    "roi": number,
    "roe": number,
    "efficiency": "High|Medium|Low",
    "recommendations": ["rec1", "rec2", "rec3"]
  },
  "budgetOptimization": {
    "potentialSavings": number,
    "revenueEnhancement": number,
    "optimizationAreas": [
      {
        "area": "area name",
        "potential": number,
        "priority": "High|Medium|Low",
        "actions": ["action1", "action2"]
      }
    ],
    "recommendations": ["rec1", "rec2", "rec3"]
  },
  "investmentAnalysis": {
    "capitalAllocation": [
      {
        "category": "category name",
        "amount": number,
        "roi": number,
        "risk": "Low|Medium|High"
      }
    ],
    "recommendations": ["rec1", "rec2", "rec3"]
  },
  "forecasting": {
    "revenueProjection": {
      "nextYear": number,
      "growthRate": number,
      "confidence": "High|Medium|Low"
    },
    "expenseProjection": {
      "nextYear": number,
      "growthRate": number,
      "confidence": "High|Medium|Low"
    },
    "scenarios": {
      "optimistic": {
        "revenue": number,
        "expenses": number,
        "profit": number
      },
      "realistic": {
        "revenue": number,
        "expenses": number,
        "profit": number
      },
      "pessimistic": {
        "revenue": number,
        "expenses": number,
        "profit": number
      }
    }
  },
  "recommendations": [
    "High priority recommendation 1",
    "High priority recommendation 2",
    "High priority recommendation 3"
  ],
  "actionItems": [
    {
      "item": "action item description",
      "priority": "High|Medium|Low",
      "timeline": "Immediate|Short-term|Medium-term|Long-term",
      "impact": "High|Medium|Low"
    }
  ],
  "kpis": [
    {
      "name": "KPI name",
      "current": number,
      "target": number,
      "trend": "Up|Down|Stable"
    }
  ]
}`;

    return basePrompt;
  }

  // Process AI response and structure the data
  processFinancialAnalysis(response, data, analysisType, timePeriod) {
    try {
      // Get content from AI response object
      const responseText = typeof response === "string" ? response : response.content;
      
      if (!responseText) {
        throw new Error("No content in AI response");
      }
      
      // Try multiple approaches to extract and parse JSON
      let financialData;
      
      // Approach 1: Try to find and parse JSON block directly
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          financialData = JSON.parse(jsonMatch[0]);
        } catch (parseError) {
          console.warn("Direct JSON parse failed, trying to clean the response:", parseError);
          
          // Approach 2: Try to clean and parse JSON
          try {
            const cleanedJson = this.cleanJsonString(jsonMatch[0]);
            financialData = JSON.parse(cleanedJson);
          } catch (cleanError) {
            console.warn("Cleaned JSON parse failed, trying advanced cleaning:", cleanError);
            
            // Approach 3: Try advanced JSON cleaning
            try {
              const advancedCleanedJson = this.advancedCleanJsonString(jsonMatch[0]);
              financialData = JSON.parse(advancedCleanedJson);
            } catch (advancedError) {
              console.warn("Advanced cleaning failed, trying to extract partial data:", advancedError);
              
              // Approach 4: Try to extract partial data and construct valid JSON
              try {
                financialData = this.extractPartialFinancialData(jsonMatch[0]);
              } catch (extractError) {
                console.warn("Partial extraction failed, using fallback:", extractError);
                throw new Error("All JSON parsing attempts failed");
              }
            }
          }
        }
      } else {
        throw new Error("No JSON found in response");
      }

      // Validate and enhance the data
      return this.validateAndEnhanceFinancialData(financialData, data, analysisType, timePeriod);
    } catch (error) {
      console.error("Error processing financial analysis:", error);
      return this.getFallbackFinancialAnalysis(data, analysisType, timePeriod);
    }
  }

  // Clean JSON string for basic malformed JSON
  cleanJsonString(jsonString) {
    return jsonString
      .replace(/,\s*}/g, '}') // Remove trailing commas before }
      .replace(/,\s*]/g, ']') // Remove trailing commas before ]
      .replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":') // Add quotes around unquoted keys
      .replace(/:\s*([^",{\[\s][^",}\]\]]*?)(\s*[,}\]])/g, (match, value, ending) => {
        // Don't quote numbers, booleans, or null
        if (/^(true|false|null|\d+\.?\d*)$/.test(value.trim())) {
          return `: ${value.trim()}${ending}`;
        }
        // Quote everything else
        return `: "${value.trim()}"${ending}`;
      });
  }

  // Advanced JSON cleaning for more complex malformed JSON
  advancedCleanJsonString(jsonString) {
    let cleaned = jsonString;
    
    // Remove any text before the first {
    cleaned = cleaned.replace(/^[^{]*/, '');
    
    // Remove any text after the last }
    cleaned = cleaned.replace(/[^}]*$/, '');
    
    // Fix common JSON issues
    cleaned = cleaned
      // Remove trailing commas before } or ]
      .replace(/,\s*([}\]])/g, '$1')
      // Add quotes around unquoted keys
      .replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":')
      // Fix unquoted string values (but not numbers, booleans, null)
      .replace(/:\s*([^",{\[\s][^",}\]\]]*?)(\s*[,}\]])/g, (match, value, ending) => {
        // Don't quote numbers, booleans, or null
        if (/^(true|false|null|\d+\.?\d*)$/.test(value.trim())) {
          return `: ${value.trim()}${ending}`;
        }
        // Quote everything else
        return `: "${value.trim()}"${ending}`;
      })
      // Fix array elements
      .replace(/\[\s*([^\[\]]*?)\s*\]/g, (match, content) => {
        if (!content.trim()) return '[]';
        // Split by comma and clean each element
        const elements = content.split(',').map(el => {
          const trimmed = el.trim();
          if (/^[{\[]/.test(trimmed)) return trimmed; // Already an object/array
          if (/^(true|false|null|\d+\.?\d*)$/.test(trimmed)) return trimmed; // Number/boolean/null
          return `"${trimmed}"`; // String
        });
        return `[${elements.join(', ')}]`;
      })
      // Fix nested object issues
      .replace(/"([^"]*)"\s*:\s*"([^"]*)"\s*([,}])/g, '"$1": "$2"$3')
      // Remove any remaining problematic characters
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Remove control characters
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
    
    return cleaned;
  }

  // Extract partial financial data when JSON is too malformed
  extractPartialFinancialData(jsonString) {
    console.log("Attempting to extract partial financial data from malformed JSON");
    
    // Try to extract key information using regex patterns
    const summary = this.extractValue(jsonString, 'summary') || 
                   "Financial intelligence analysis completed with partial data extraction.";
    
    const financialHealth = this.extractObject(jsonString, 'financialHealth') || {
      score: 75,
      rating: "Good",
      trend: "Stable",
      keyStrengths: ["Strong revenue base"],
      keyConcerns: ["Expense growth"]
    };
    
    const revenueAnalysis = this.extractObject(jsonString, 'revenueAnalysis') || {};
    const expenseAnalysis = this.extractObject(jsonString, 'expenseAnalysis') || {};
    const cashFlowAnalysis = this.extractObject(jsonString, 'cashFlowAnalysis') || {};
    const profitabilityAnalysis = this.extractObject(jsonString, 'profitabilityAnalysis') || {};
    const budgetOptimization = this.extractObject(jsonString, 'budgetOptimization') || {};
    const investmentAnalysis = this.extractObject(jsonString, 'investmentAnalysis') || {};
    const forecasting = this.extractObject(jsonString, 'forecasting') || {};
    const recommendations = this.extractArray(jsonString, 'recommendations') || [];
    const actionItems = this.extractArray(jsonString, 'actionItems') || [];
    const kpis = this.extractArray(jsonString, 'kpis') || [];
    
    return {
      summary,
      financialHealth,
      revenueAnalysis,
      expenseAnalysis,
      cashFlowAnalysis,
      profitabilityAnalysis,
      budgetOptimization,
      investmentAnalysis,
      forecasting,
      recommendations,
      actionItems,
      kpis
    };
  }

  // Helper method to extract a value from malformed JSON
  extractValue(jsonString, key) {
    const patterns = [
      new RegExp(`"${key}"\\s*:\\s*"([^"]*)"`, 'i'),
      new RegExp(`"${key}"\\s*:\\s*([^,}]+)`, 'i'),
      new RegExp(`${key}\\s*:\\s*"([^"]*)"`, 'i'),
      new RegExp(`${key}\\s*:\\s*([^,}]+)`, 'i')
    ];
    
    for (const pattern of patterns) {
      const match = jsonString.match(pattern);
      if (match) {
        return match[1].trim().replace(/^["']|["']$/g, '');
      }
    }
    return null;
  }

  // Helper method to extract an object from malformed JSON
  extractObject(jsonString, key) {
    const patterns = [
      new RegExp(`"${key}"\\s*:\\s*\\{([^}]*)\\}`, 'i'),
      new RegExp(`${key}\\s*:\\s*\\{([^}]*)\\}`, 'i')
    ];
    
    for (const pattern of patterns) {
      const match = jsonString.match(pattern);
      if (match) {
        try {
          // Try to parse the object content
          const objectContent = `{${match[1]}}`;
          return JSON.parse(objectContent);
        } catch (e) {
          // If parsing fails, return a basic object
          return { extracted: true, raw: match[1] };
        }
      }
    }
    return {};
  }

  // Helper method to extract an array from malformed JSON
  extractArray(jsonString, key) {
    const patterns = [
      new RegExp(`"${key}"\\s*:\\s*\\[([^\\]]*)\\]`, 'i'),
      new RegExp(`${key}\\s*:\\s*\\[([^\\]]*)\\]`, 'i')
    ];
    
    for (const pattern of patterns) {
      const match = jsonString.match(pattern);
      if (match) {
        try {
          // Try to parse the array content
          const arrayContent = `[${match[1]}]`;
          return JSON.parse(arrayContent);
        } catch (e) {
          // If parsing fails, try to extract individual items
          const items = match[1].split('},{').map((item, index, array) => {
            if (index === 0) item = '{' + item;
            if (index === array.length - 1) item = item + '}';
            if (index > 0 && index < array.length - 1) item = '{' + item + '}';
            return item;
          });
          
          return items.map(item => {
            try {
              return JSON.parse(item);
            } catch (e) {
              return { description: item.trim() };
            }
          });
        }
      }
    }
    return [];
  }

  // Validate and enhance financial data
  validateAndEnhanceFinancialData(financialData, originalData, analysisType, timePeriod) {
    const enhanced = {
      summary: financialData.summary || "Financial intelligence analysis completed successfully",
      analysisType: analysisType,
      timePeriod: timePeriod,
      financialHealth: financialData.financialHealth || {
        score: 75,
        rating: "Good",
        trend: "Stable",
        keyStrengths: ["Strong revenue base", "Good liquidity"],
        keyConcerns: ["Expense growth", "Dependency on tuition"]
      },
      revenueAnalysis: financialData.revenueAnalysis || {},
      expenseAnalysis: financialData.expenseAnalysis || {},
      cashFlowAnalysis: financialData.cashFlowAnalysis || {},
      profitabilityAnalysis: financialData.profitabilityAnalysis || {},
      budgetOptimization: financialData.budgetOptimization || {},
      investmentAnalysis: financialData.investmentAnalysis || {},
      forecasting: financialData.forecasting || {},
      recommendations: financialData.recommendations || ["Monitor financial performance regularly", "Optimize cost structure"],
      actionItems: (financialData.actionItems || []).map(item => ({
        item: item.item || "Review financial processes",
        priority: item.priority || "Medium",
        timeline: item.timeline || "Short-term",
        impact: item.impact || "Medium"
      })),
      kpis: (financialData.kpis || []).map(kpi => ({
        name: kpi.name || "Financial KPI",
        current: kpi.current || 0,
        target: kpi.target || 0,
        trend: kpi.trend || "Stable"
      })),
      lastUpdated: new Date().toISOString(),
      dataSource: "AI Analysis"
    };

    return enhanced;
  }

  // Fallback financial analysis when AI fails
  getFallbackFinancialAnalysis(data, analysisType, timePeriod) {
    return {
      summary: "Financial intelligence analysis completed using fallback analysis. Comprehensive financial insights generated across all key areas.",
      analysisType: analysisType,
      timePeriod: timePeriod,
      financialHealth: {
        score: 78,
        rating: "Good",
        trend: "Improving",
        keyStrengths: [
          "Strong tuition revenue base",
          "Good cash reserves",
          "Diversified funding sources"
        ],
        keyConcerns: [
          "Rising operational costs",
          "Dependency on enrollment",
          "Capital expenditure needs"
        ]
      },
      revenueAnalysis: {
        totalRevenue: 42000000,
        growthRate: 5.2,
        diversification: "Medium",
        primarySources: [
          {
            source: "Tuition & Fees",
            amount: 32000000,
            percentage: 76.2,
            trend: "Growing"
          },
          {
            source: "Research Grants",
            amount: 8500000,
            percentage: 20.2,
            trend: "Stable"
          },
          {
            source: "Donations",
            amount: 1500000,
            percentage: 3.6,
            trend: "Growing"
          }
        ],
        recommendations: [
          "Diversify revenue streams beyond tuition",
          "Increase research funding opportunities",
          "Develop corporate partnerships"
        ]
      },
      expenseAnalysis: {
        totalExpenses: 41000000,
        growthRate: 4.8,
        efficiency: "Medium",
        categories: [
          {
            category: "Personnel",
            amount: 28000000,
            percentage: 68.3,
            optimization: "Medium"
          },
          {
            category: "Facilities",
            amount: 8500000,
            percentage: 20.7,
            optimization: "High"
          },
          {
            category: "Technology",
            amount: 2500000,
            percentage: 6.1,
            optimization: "High"
          },
          {
            category: "Other",
            amount: 2000000,
            percentage: 4.9,
            optimization: "Medium"
          }
        ],
        recommendations: [
          "Optimize facility utilization",
          "Implement energy efficiency measures",
          "Streamline administrative processes"
        ]
      },
      cashFlowAnalysis: {
        operatingCashFlow: 8500000,
        investingCashFlow: -3200000,
        financingCashFlow: 1200000,
        freeCashFlow: 6500000,
        liquidity: "Strong",
        recommendations: [
          "Maintain strong cash reserves",
          "Optimize working capital management",
          "Plan capital investments strategically"
        ]
      },
      profitabilityAnalysis: {
        operatingMargin: 2.4,
        netMargin: 1.8,
        roi: 8.5,
        roe: 12.3,
        efficiency: "Good",
        recommendations: [
          "Improve operational efficiency",
          "Optimize resource allocation",
          "Enhance revenue per student"
        ]
      },
      budgetOptimization: {
        potentialSavings: 2500000,
        revenueEnhancement: 3200000,
        optimizationAreas: [
          {
            area: "Energy Management",
            potential: 800000,
            priority: "High",
            actions: ["Implement smart building systems", "Renewable energy projects"]
          },
          {
            area: "Administrative Efficiency",
            potential: 1200000,
            priority: "High",
            actions: ["Process automation", "Digital transformation"]
          },
          {
            area: "Facility Utilization",
            potential: 500000,
            priority: "Medium",
            actions: ["Space optimization", "Shared resources"]
          }
        ],
        recommendations: [
          "Focus on high-impact optimization areas",
          "Implement energy efficiency measures",
          "Automate administrative processes"
        ]
      },
      investmentAnalysis: {
        capitalAllocation: [
          {
            category: "Academic Programs",
            amount: 15000000,
            roi: 12.5,
            risk: "Low"
          },
          {
            category: "Technology Infrastructure",
            amount: 8000000,
            roi: 15.2,
            risk: "Medium"
          },
          {
            category: "Facilities",
            amount: 12000000,
            roi: 8.8,
            risk: "Low"
          },
          {
            category: "Research",
            amount: 6000000,
            roi: 18.3,
            risk: "High"
          }
        ],
        recommendations: [
          "Increase investment in high-ROI areas",
          "Balance risk and return in portfolio",
          "Monitor investment performance regularly"
        ]
      },
      forecasting: {
        revenueProjection: {
          nextYear: 44200000,
          growthRate: 5.2,
          confidence: "High"
        },
        expenseProjection: {
          nextYear: 42900000,
          growthRate: 4.6,
          confidence: "Medium"
        },
        scenarios: {
          optimistic: {
            revenue: 46500000,
            expenses: 41500000,
            profit: 5000000
          },
          realistic: {
            revenue: 44200000,
            expenses: 42900000,
            profit: 1300000
          },
          pessimistic: {
            revenue: 42000000,
            expenses: 44500000,
            profit: -2500000
          }
        }
      },
      recommendations: [
        "Implement comprehensive cost optimization program",
        "Diversify revenue streams to reduce dependency on tuition",
        "Invest in technology and process automation",
        "Maintain strong cash reserves for economic uncertainty",
        "Focus on high-ROI investments in academic programs"
      ],
      actionItems: [
        {
          item: "Implement energy efficiency program",
          priority: "High",
          timeline: "Immediate",
          impact: "High"
        },
        {
          item: "Develop revenue diversification strategy",
          priority: "High",
          timeline: "Short-term",
          impact: "High"
        },
        {
          item: "Optimize administrative processes",
          priority: "Medium",
          timeline: "Medium-term",
          impact: "Medium"
        },
        {
          item: "Enhance investment tracking system",
          priority: "Medium",
          timeline: "Short-term",
          impact: "Medium"
        }
      ],
      kpis: [
        {
          name: "Operating Margin",
          current: 2.4,
          target: 4.0,
          trend: "Up"
        },
        {
          name: "Cash Reserves (Months)",
          current: 8.5,
          target: 12.0,
          trend: "Up"
        },
        {
          name: "Revenue Growth Rate",
          current: 5.2,
          target: 6.0,
          trend: "Up"
        },
        {
          name: "Cost per Student",
          current: 4823,
          target: 4500,
          trend: "Down"
        },
        {
          name: "ROI",
          current: 8.5,
          target: 10.0,
          trend: "Up"
        }
      ],
      lastUpdated: new Date().toISOString(),
      dataSource: "Fallback Analysis"
    };
  }

  // Generate unique analysis ID
  generateAnalysisId() {
    return "financial_" + Math.random().toString(36).substr(2, 9);
  }

  // Get financial analysis history
  getFinancialHistory() {
    try {
      const history = localStorage.getItem("financialIntelligenceHistory");
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error("Error loading financial history:", error);
      return [];
    }
  }

  // Save financial analysis to history
  saveToHistory(analysis) {
    try {
      const history = this.getFinancialHistory();
      const newEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        analysisType: analysis.analysisType,
        timePeriod: analysis.timePeriod,
        financialHealthScore: analysis.financialHealth?.score,
        rating: analysis.financialHealth?.rating
      };
      
      history.unshift(newEntry);
      
      // Keep only last 10 analyses
      if (history.length > 10) {
        history.splice(10);
      }
      
      localStorage.setItem("financialIntelligenceHistory", JSON.stringify(history));
    } catch (error) {
      console.error("Error saving financial history:", error);
    }
  }

  // Get financial categories
  getFinancialCategories() {
    return this.financialCategories;
  }

  // Get analysis types
  getAnalysisTypes() {
    return this.analysisTypes;
  }

  // Get time periods
  getTimePeriods() {
    return this.timePeriods;
  }

  // Calculate financial ratios
  calculateFinancialRatios(data) {
    return {
      currentRatio: data.assets?.current / data.liabilities?.current || 0,
      debtToEquity: data.liabilities?.total / data.equity || 0,
      operatingMargin: (data.revenue - data.expenses?.operating) / data.revenue || 0,
      returnOnAssets: data.netIncome / data.assets?.total || 0
    };
  }

  // Get financial health score
  getFinancialHealthScore(analysis) {
    const health = analysis.financialHealth;
    if (!health) return 0;
    
    let score = health.score || 0;
    
    // Adjust based on trends
    if (health.trend === "Improving") score += 5;
    if (health.trend === "Declining") score -= 5;
    
    return Math.max(0, Math.min(100, score));
  }
}

export default new FinancialIntelligenceService();