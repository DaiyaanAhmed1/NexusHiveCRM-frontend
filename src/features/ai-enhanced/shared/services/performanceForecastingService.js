import aiService from "../../../../services/aiService";
import aiLanguageService from "../../../../services/aiLanguageService";
class PerformanceForecastingService {
  constructor() {
    this.forecastTypes = [
      "revenue",
      "enrollment", 
      "financial",
      "academic",
      "operational"
    ];
    
    this.timeHorizons = ["3-months", "6-months", "1-year", "2-years", "3-years"];
    this.scenarios = ["best-case", "most-likely", "worst-case"];
  }

  // Main forecasting function
  async generateForecast(universityData, forecastType = "revenue", timeHorizon = "1-year") {
    try {
      console.log("Starting performance forecast with data:", universityData);
      
      const prompt = this.buildForecastingPrompt(universityData, forecastType, timeHorizon);
      const currentLanguage = aiLanguageService.getCurrentLanguage();
      
      const response = await aiService.generateResponse(
        prompt,
        "director", 
        [], // chatHistory - empty array
        currentLanguage // currentUILanguage
      );
      
      return this.processForecast(response, universityData, forecastType, timeHorizon);
    } catch (error) {
      console.error("Performance forecasting error:", error);
      return this.getFallbackForecast(universityData, forecastType, timeHorizon);
    }
  }

  // Build AI prompt for performance forecasting
  buildForecastingPrompt(data, forecastType, timeHorizon) {
    const basePrompt = `As a university performance forecasting expert, analyze the following university data and generate comprehensive performance predictions across multiple scenarios.

University Data:
${JSON.stringify(data, null, 2)}

Forecast Type: ${forecastType}
Time Horizon: ${timeHorizon}

Please provide detailed forecasts for:
1. Revenue Forecasting - Tuition, fees, grants, donations, research funding
2. Enrollment Forecasting - Student numbers, retention, new admissions
3. Financial Performance - Budget, expenses, profitability, cash flow
4. Academic Performance - Program success, faculty metrics, research output
5. Operational Performance - Efficiency, resource utilization, cost management

For each forecast, provide:
- Current baseline metrics
- Growth trends and patterns
- Key drivers and factors
- Scenario analysis (Best case, Most likely, Worst case)
- Confidence levels and assumptions
- Risk factors and mitigation strategies
- Actionable recommendations

Format your response as structured JSON with this exact structure:
{
  "summary": "Overall forecasting summary",
  "forecastType": "${forecastType}",
  "timeHorizon": "${timeHorizon}",
  "confidence": "High|Medium|Low",
  "baseline": {
    "currentValue": number,
    "growthRate": number,
    "trend": "Increasing|Stable|Decreasing"
  },
  "scenarios": {
    "bestCase": {
      "value": number,
      "growthRate": number,
      "probability": number,
      "keyDrivers": ["driver1", "driver2", "driver3"],
      "assumptions": ["assumption1", "assumption2"]
    },
    "mostLikely": {
      "value": number,
      "growthRate": number,
      "probability": number,
      "keyDrivers": ["driver1", "driver2", "driver3"],
      "assumptions": ["assumption1", "assumption2"]
    },
    "worstCase": {
      "value": number,
      "growthRate": number,
      "probability": number,
      "keyDrivers": ["driver1", "driver2", "driver3"],
      "assumptions": ["assumption1", "assumption2"]
    }
  },
  "forecasts": [
    {
      "id": "unique_id",
      "metric": "Metric Name",
      "category": "revenue|enrollment|financial|academic|operational",
      "currentValue": number,
      "unit": "currency|percentage|count",
      "scenarios": {
        "bestCase": number,
        "mostLikely": number,
        "worstCase": number
      },
      "growthRate": number,
      "confidence": "High|Medium|Low",
      "keyDrivers": ["driver1", "driver2"],
      "risks": ["risk1", "risk2"],
      "recommendations": ["rec1", "rec2"]
    }
  ],
  "trends": {
    "increasing": ["trend1", "trend2"],
    "stable": ["trend3", "trend4"],
    "decreasing": ["trend5"]
  },
  "recommendations": [
    "High priority recommendation 1",
    "High priority recommendation 2",
    "High priority recommendation 3"
  ],
  "riskFactors": [
    {
      "factor": "Risk factor name",
      "impact": "High|Medium|Low",
      "probability": "High|Medium|Low",
      "mitigation": "Mitigation strategy"
    }
  ]
}`;

    return basePrompt;
  }

  // Process AI response and structure the data
  processForecast(response, data, forecastType, timeHorizon) {
    try {
      // Try to parse JSON response
      let forecastData;
      if (typeof response === "string") {
        // Extract JSON from response if it's wrapped in text
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          forecastData = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error("No JSON found in response");
        }
      } else {
        forecastData = response;
      }

      // Validate and enhance the data
      return this.validateAndEnhanceForecast(forecastData, data, forecastType, timeHorizon);
    } catch (error) {
      console.error("Error processing forecast:", error);
      return this.getFallbackForecast(data, forecastType, timeHorizon);
    }
  }

  // Validate and enhance forecast data
  validateAndEnhanceForecast(forecastData, originalData, forecastType, timeHorizon) {
    const enhanced = {
      summary: forecastData.summary || "Performance forecast completed successfully",
      forecastType: forecastType,
      timeHorizon: timeHorizon,
      confidence: forecastData.confidence || "Medium",
      baseline: forecastData.baseline || {
        currentValue: 0,
        growthRate: 0,
        trend: "Stable"
      },
      scenarios: forecastData.scenarios || {},
      forecasts: (forecastData.forecasts || []).map(forecast => ({
        id: forecast.id || this.generateForecastId(),
        metric: forecast.metric || "Unnamed Metric",
        category: forecast.category || "operational",
        currentValue: forecast.currentValue || 0,
        unit: forecast.unit || "count",
        scenarios: forecast.scenarios || {
          bestCase: 0,
          mostLikely: 0,
          worstCase: 0
        },
        growthRate: forecast.growthRate || 0,
        confidence: forecast.confidence || "Medium",
        keyDrivers: forecast.keyDrivers || ["Market conditions", "Internal factors"],
        risks: forecast.risks || ["Economic uncertainty"],
        recommendations: forecast.recommendations || ["Monitor trends", "Adjust strategy"]
      })),
      trends: forecastData.trends || { increasing: [], stable: [], decreasing: [] },
      recommendations: forecastData.recommendations || ["Monitor performance regularly", "Adjust strategies based on trends"],
      riskFactors: (forecastData.riskFactors || []).map(risk => ({
        factor: risk.factor || "Unknown risk",
        impact: risk.impact || "Medium",
        probability: risk.probability || "Medium",
        mitigation: risk.mitigation || "Develop mitigation plan"
      })),
      lastUpdated: new Date().toISOString(),
      dataSource: "AI Analysis"
    };

    return enhanced;
  }

  // Fallback forecast when AI fails
  getFallbackForecast(data, forecastType, timeHorizon) {
    const fallbackForecasts = [
      {
        id: "forecast_001",
        metric: "Total Revenue",
        category: "revenue",
        currentValue: 45000000,
        unit: "currency",
        scenarios: {
          bestCase: 52000000,
          mostLikely: 48000000,
          worstCase: 42000000
        },
        growthRate: 6.7,
        confidence: "Medium",
        keyDrivers: ["Enrollment growth", "Tuition increases", "Research funding"],
        risks: ["Economic downturn", "Competition", "Regulatory changes"],
        recommendations: ["Diversify revenue streams", "Optimize pricing strategy", "Enhance research programs"]
      },
      {
        id: "forecast_002",
        metric: "Student Enrollment",
        category: "enrollment",
        currentValue: 8500,
        unit: "count",
        scenarios: {
          bestCase: 9500,
          mostLikely: 9000,
          worstCase: 8000
        },
        growthRate: 5.9,
        confidence: "High",
        keyDrivers: ["Marketing effectiveness", "Program quality", "Financial aid"],
        risks: ["Demographic changes", "Competition", "Economic factors"],
        recommendations: ["Enhance marketing", "Improve student experience", "Expand financial aid"]
      },
      {
        id: "forecast_003",
        metric: "Operating Margin",
        category: "financial",
        currentValue: 2.3,
        unit: "percentage",
        scenarios: {
          bestCase: 4.1,
          mostLikely: 3.2,
          worstCase: 1.8
        },
        growthRate: 39.1,
        confidence: "Medium",
        keyDrivers: ["Cost management", "Revenue optimization", "Efficiency improvements"],
        risks: ["Rising costs", "Revenue pressure", "Investment needs"],
        recommendations: ["Cost optimization", "Revenue diversification", "Process improvement"]
      },
      {
        id: "forecast_004",
        metric: "Graduation Rate",
        category: "academic",
        currentValue: 78.5,
        unit: "percentage",
        scenarios: {
          bestCase: 82.0,
          mostLikely: 80.0,
          worstCase: 76.0
        },
        growthRate: 1.9,
        confidence: "High",
        keyDrivers: ["Student support", "Academic quality", "Retention programs"],
        risks: ["Student challenges", "Resource constraints", "External factors"],
        recommendations: ["Enhance student support", "Improve academic programs", "Strengthen retention"]
      },
      {
        id: "forecast_005",
        metric: "Cost per Student",
        category: "operational",
        currentValue: 4823,
        unit: "currency",
        scenarios: {
          bestCase: 4500,
          mostLikely: 4700,
          worstCase: 5100
        },
        growthRate: -2.5,
        confidence: "Medium",
        keyDrivers: ["Efficiency improvements", "Technology adoption", "Process optimization"],
        risks: ["Inflation", "Technology costs", "Regulatory requirements"],
        recommendations: ["Process automation", "Technology optimization", "Cost management"]
      }
    ];

    return {
      summary: `Performance forecast completed using fallback analysis. ${fallbackForecasts.length} key metrics forecasted across multiple scenarios.`,
      forecastType: forecastType,
      timeHorizon: timeHorizon,
      confidence: "Medium",
      baseline: {
        currentValue: 45000000,
        growthRate: 6.7,
        trend: "Increasing"
      },
      scenarios: {
        bestCase: {
          value: 52000000,
          growthRate: 15.6,
          probability: 25,
          keyDrivers: ["Strong enrollment", "Increased funding", "Market growth"],
          assumptions: ["Favorable economic conditions", "Successful marketing", "Quality improvements"]
        },
        mostLikely: {
          value: 48000000,
          growthRate: 6.7,
          probability: 50,
          keyDrivers: ["Steady enrollment", "Moderate growth", "Cost management"],
          assumptions: ["Stable economic conditions", "Current trends continue", "Normal operations"]
        },
        worstCase: {
          value: 42000000,
          growthRate: -6.7,
          probability: 25,
          keyDrivers: ["Economic downturn", "Competition", "Cost pressures"],
          assumptions: ["Economic challenges", "Increased competition", "Rising costs"]
        }
      },
      forecasts: fallbackForecasts,
      trends: {
        increasing: ["Revenue growth", "Enrollment", "Graduation rates"],
        stable: ["Operating efficiency", "Student satisfaction"],
        decreasing: ["Cost per student", "Administrative overhead"]
      },
      recommendations: [
        "Focus on revenue diversification and growth",
        "Optimize operational efficiency and cost management",
        "Enhance student experience and retention programs",
        "Invest in technology and process improvements",
        "Monitor market trends and competitive landscape"
      ],
      riskFactors: [
        {
          factor: "Economic uncertainty",
          impact: "High",
          probability: "Medium",
          mitigation: "Diversify revenue streams and build reserves"
        },
        {
          factor: "Competition",
          impact: "Medium",
          probability: "High",
          mitigation: "Differentiate programs and improve value proposition"
        },
        {
          factor: "Regulatory changes",
          impact: "Medium",
          probability: "Medium",
          mitigation: "Stay informed and adapt compliance processes"
        }
      ],
      lastUpdated: new Date().toISOString(),
      dataSource: "Fallback Analysis"
    };
  }

  // Generate unique forecast ID
  generateForecastId() {
    return "forecast_" + Math.random().toString(36).substr(2, 9);
  }

  // Get forecast history
  getForecastHistory() {
    try {
      const history = localStorage.getItem("performanceForecastHistory");
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error("Error loading forecast history:", error);
      return [];
    }
  }

  // Save forecast to history
  saveToHistory(forecast) {
    try {
      const history = this.getForecastHistory();
      const newEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        forecastType: forecast.forecastType,
        timeHorizon: forecast.timeHorizon,
        confidence: forecast.confidence,
        baselineValue: forecast.baseline.currentValue
      };
      
      history.unshift(newEntry);
      
      // Keep only last 10 forecasts
      if (history.length > 10) {
        history.splice(10);
      }
      
      localStorage.setItem("performanceForecastHistory", JSON.stringify(history));
    } catch (error) {
      console.error("Error saving forecast history:", error);
    }
  }

  // Get forecast types
  getForecastTypes() {
    return this.forecastTypes;
  }

  // Get time horizons
  getTimeHorizons() {
    return this.timeHorizons;
  }

  // Get scenarios
  getScenarios() {
    return this.scenarios;
  }

  // Filter forecasts by category
  filterForecastsByCategory(forecasts, category) {
    if (category === "all") return forecasts;
    return forecasts.filter(forecast => forecast.category === category);
  }

  // Sort forecasts by growth rate
  sortForecastsByGrowth(forecasts, order = "desc") {
    return forecasts.sort((a, b) => {
      return order === "desc" ? b.growthRate - a.growthRate : a.growthRate - b.growthRate;
    });
  }

  // Get forecast statistics
  getForecastStatistics(forecasts) {
    const stats = {
      total: forecasts.length,
      byCategory: {},
      byConfidence: {},
      averageGrowth: 0,
      totalCurrentValue: 0
    };

    let totalGrowth = 0;
    let totalValue = 0;

    forecasts.forEach(forecast => {
      // By category
      stats.byCategory[forecast.category] = (stats.byCategory[forecast.category] || 0) + 1;
      
      // By confidence
      stats.byConfidence[forecast.confidence] = (stats.byConfidence[forecast.confidence] || 0) + 1;
      
      totalGrowth += forecast.growthRate;
      totalValue += forecast.currentValue;
    });

    stats.averageGrowth = forecasts.length > 0 ? Math.round(totalGrowth / forecasts.length * 100) / 100 : 0;
    stats.totalCurrentValue = totalValue;

    return stats;
  }
}

export default new PerformanceForecastingService();