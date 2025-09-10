import aiService from "../../../../services/aiService";
import aiLanguageService from "../../../../services/aiLanguageService";

class RiskAssessmentService {
  constructor() {
    this.riskCategories = [
      "financial",
      "operational", 
      "strategic",
      "compliance",
      "reputation"
    ];
    
    this.riskLevels = ["Low", "Medium", "High", "Critical"];
    this.impactLevels = ["Minimal", "Moderate", "Significant", "Severe"];
  }

  // Main risk assessment function
  async assessRisks(universityData, focusArea = "all") {
    try {
      console.log("Starting risk assessment with data:", universityData);
      
      const prompt = this.buildRiskAssessmentPrompt(universityData, focusArea);
      const currentLanguage = aiLanguageService.getCurrentLanguage();
      
      const response = await aiService.generateResponse(
        prompt,
        "director",
        [], // chatHistory - empty array
        currentLanguage // currentUILanguage
      );
      
      return this.processRiskAssessment(response, universityData);
    } catch (error) {
      console.error("Risk assessment error:", error);
      return this.getFallbackRiskAssessment(universityData, focusArea);
    }
  }

  // Build AI prompt for risk assessment
  buildRiskAssessmentPrompt(data, focusArea) {
    const basePrompt = `As a university risk assessment expert, analyze the following university data and identify potential risks across different categories. Provide a comprehensive risk analysis with specific recommendations.

University Data:
${JSON.stringify(data, null, 2)}

Focus Area: ${focusArea}

Please analyze risks in these categories:
1. Financial Risks - Budget, revenue, funding, cost management
2. Operational Risks - Systems, processes, staff, infrastructure  
3. Strategic Risks - Market position, competition, growth plans
4. Compliance Risks - Regulations, accreditation, legal requirements
5. Reputation Risks - Public image, student satisfaction, media

For each identified risk, provide:
- Risk Name and Description
- Category (financial/operational/strategic/compliance/reputation)
- Probability (Low/Medium/High/Critical)
- Impact (Minimal/Moderate/Significant/Severe)
- Risk Score (1-100)
- Mitigation Strategies (3-5 specific actions)
- Timeline (Immediate/Short-term/Medium-term/Long-term)

Format your response as structured JSON with this exact structure:
{
  "summary": "Overall risk assessment summary",
  "totalRisks": number,
  "criticalRisks": number,
  "highRisks": number,
  "riskCategories": {
    "financial": { "count": number, "highestRisk": "risk name" },
    "operational": { "count": number, "highestRisk": "risk name" },
    "strategic": { "count": number, "highestRisk": "risk name" },
    "compliance": { "count": number, "highestRisk": "risk name" },
    "reputation": { "count": number, "highestRisk": "risk name" }
  },
  "risks": [
    {
      "id": "unique_id",
      "name": "Risk Name",
      "description": "Detailed description",
      "category": "financial|operational|strategic|compliance|reputation",
      "probability": "Low|Medium|High|Critical",
      "impact": "Minimal|Moderate|Significant|Severe",
      "riskScore": number,
      "mitigationStrategies": ["strategy1", "strategy2", "strategy3"],
      "timeline": "Immediate|Short-term|Medium-term|Long-term",
      "lastAssessed": "current_date"
    }
  ],
  "recommendations": [
    "High priority recommendation 1",
    "High priority recommendation 2",
    "High priority recommendation 3"
  ],
  "riskTrends": {
    "increasing": ["risk1", "risk2"],
    "stable": ["risk3", "risk4"],
    "decreasing": ["risk5"]
  }
}`;

    return basePrompt;
  }

  // Process AI response and structure the data
  processRiskAssessment(response, data) {
    try {
      // Try to parse JSON response
      let riskData;
      if (typeof response === "string") {
        // Extract JSON from response if it's wrapped in text
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          riskData = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error("No JSON found in response");
        }
      } else {
        riskData = response;
      }

      // Validate and enhance the data
      return this.validateAndEnhanceRiskData(riskData, data);
    } catch (error) {
      console.error("Error processing risk assessment:", error);
      return this.getFallbackRiskAssessment(data);
    }
  }

  // Validate and enhance risk data
  validateAndEnhanceRiskData(riskData, originalData) {
    const enhanced = {
      summary: riskData.summary || "Risk assessment completed successfully",
      totalRisks: riskData.totalRisks || 0,
      criticalRisks: riskData.criticalRisks || 0,
      highRisks: riskData.highRisks || 0,
      riskCategories: riskData.riskCategories || {},
      risks: (riskData.risks || []).map(risk => ({
        id: risk.id || this.generateRiskId(),
        name: risk.name || "Unnamed Risk",
        description: risk.description || "No description available",
        category: risk.category || "operational",
        probability: risk.probability || "Medium",
        impact: risk.impact || "Moderate",
        riskScore: risk.riskScore || this.calculateRiskScore(risk.probability, risk.impact),
        mitigationStrategies: risk.mitigationStrategies || ["Review and assess", "Develop mitigation plan"],
        timeline: risk.timeline || "Short-term",
        lastAssessed: new Date().toISOString(),
        status: "Active"
      })),
      recommendations: riskData.recommendations || ["Monitor risk levels regularly", "Implement mitigation strategies"],
      riskTrends: riskData.riskTrends || { increasing: [], stable: [], decreasing: [] },
      lastUpdated: new Date().toISOString(),
      dataSource: "AI Analysis"
    };

    // Calculate summary statistics
    enhanced.totalRisks = enhanced.risks.length;
    enhanced.criticalRisks = enhanced.risks.filter(r => r.probability === "Critical" || r.impact === "Severe").length;
    enhanced.highRisks = enhanced.risks.filter(r => r.probability === "High" || r.impact === "Significant").length;

    return enhanced;
  }

  // Fallback risk assessment when AI fails
  getFallbackRiskAssessment(data, focusArea = "all") {
    const fallbackRisks = [
      {
        id: "risk_001",
        name: "Budget Shortfall Risk",
        description: "Potential revenue shortfall due to enrollment fluctuations or unexpected expenses",
        category: "financial",
        probability: "Medium",
        impact: "Significant",
        riskScore: 65,
        mitigationStrategies: [
          "Diversify revenue streams",
          "Implement cost monitoring systems",
          "Build emergency reserve fund",
          "Regular budget reviews"
        ],
        timeline: "Short-term",
        lastAssessed: new Date().toISOString(),
        status: "Active"
      },
      {
        id: "risk_002",
        name: "Staff Retention Risk",
        description: "Risk of losing key faculty and staff members to competitors",
        category: "operational",
        probability: "High",
        impact: "Significant",
        riskScore: 75,
        mitigationStrategies: [
          "Improve compensation packages",
          "Enhance professional development opportunities",
          "Strengthen workplace culture",
          "Implement retention bonuses"
        ],
        timeline: "Medium-term",
        lastAssessed: new Date().toISOString(),
        status: "Active"
      },
      {
        id: "risk_003",
        name: "Technology Infrastructure Risk",
        description: "Aging IT systems and potential cybersecurity vulnerabilities",
        category: "operational",
        probability: "Medium",
        impact: "Moderate",
        riskScore: 55,
        mitigationStrategies: [
          "Upgrade critical systems",
          "Implement cybersecurity measures",
          "Regular system maintenance",
          "Staff training on security protocols"
        ],
        timeline: "Medium-term",
        lastAssessed: new Date().toISOString(),
        status: "Active"
      },
      {
        id: "risk_004",
        name: "Regulatory Compliance Risk",
        description: "Risk of non-compliance with education regulations and accreditation standards",
        category: "compliance",
        probability: "Low",
        impact: "Severe",
        riskScore: 60,
        mitigationStrategies: [
          "Regular compliance audits",
          "Staff training on regulations",
          "Documentation management system",
          "Legal consultation"
        ],
        timeline: "Long-term",
        lastAssessed: new Date().toISOString(),
        status: "Active"
      },
      {
        id: "risk_005",
        name: "Reputation Risk",
        description: "Potential damage to university reputation from negative publicity or incidents",
        category: "reputation",
        probability: "Low",
        impact: "Severe",
        riskScore: 50,
        mitigationStrategies: [
          "Crisis communication plan",
          "Social media monitoring",
          "Student satisfaction surveys",
          "Public relations strategy"
        ],
        timeline: "Long-term",
        lastAssessed: new Date().toISOString(),
        status: "Active"
      }
    ];

    return {
      summary: "Risk assessment completed using fallback analysis. 5 key risks identified across different categories.",
      totalRisks: fallbackRisks.length,
      criticalRisks: 0,
      highRisks: 2,
      riskCategories: {
        financial: { count: 1, highestRisk: "Budget Shortfall Risk" },
        operational: { count: 2, highestRisk: "Staff Retention Risk" },
        strategic: { count: 0, highestRisk: "None identified" },
        compliance: { count: 1, highestRisk: "Regulatory Compliance Risk" },
        reputation: { count: 1, highestRisk: "Reputation Risk" }
      },
      risks: fallbackRisks,
      recommendations: [
        "Prioritize high-impact risks for immediate attention",
        "Develop comprehensive risk mitigation strategies",
        "Implement regular risk monitoring and assessment",
        "Establish risk management committee"
      ],
      riskTrends: {
        increasing: ["Staff Retention Risk", "Technology Infrastructure Risk"],
        stable: ["Budget Shortfall Risk"],
        decreasing: ["Regulatory Compliance Risk", "Reputation Risk"]
      },
      lastUpdated: new Date().toISOString(),
      dataSource: "Fallback Analysis"
    };
  }

  // Calculate risk score based on probability and impact
  calculateRiskScore(probability, impact) {
    const probabilityScores = { "Low": 1, "Medium": 2, "High": 3, "Critical": 4 };
    const impactScores = { "Minimal": 1, "Moderate": 2, "Significant": 3, "Severe": 4 };
    
    const probScore = probabilityScores[probability] || 2;
    const impactScore = impactScores[impact] || 2;
    
    return Math.round((probScore * impactScore * 6.25)); // Scale to 1-100
  }

  // Generate unique risk ID
  generateRiskId() {
    return "risk_" + Math.random().toString(36).substr(2, 9);
  }

  // Get risk assessment history
  getRiskHistory() {
    try {
      const history = localStorage.getItem("riskAssessmentHistory");
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error("Error loading risk history:", error);
      return [];
    }
  }

  // Save risk assessment to history
  saveToHistory(assessment) {
    try {
      const history = this.getRiskHistory();
      const newEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        summary: assessment.summary,
        totalRisks: assessment.totalRisks,
        criticalRisks: assessment.criticalRisks,
        highRisks: assessment.highRisks
      };
      
      history.unshift(newEntry);
      
      // Keep only last 10 assessments
      if (history.length > 10) {
        history.splice(10);
      }
      
      localStorage.setItem("riskAssessmentHistory", JSON.stringify(history));
    } catch (error) {
      console.error("Error saving risk history:", error);
    }
  }

  // Get risk categories
  getRiskCategories() {
    return this.riskCategories;
  }

  // Get risk levels
  getRiskLevels() {
    return this.riskLevels;
  }

  // Get impact levels
  getImpactLevels() {
    return this.impactLevels;
  }

  // Filter risks by category
  filterRisksByCategory(risks, category) {
    if (category === "all") return risks;
    return risks.filter(risk => risk.category === category);
  }

  // Sort risks by score
  sortRisksByScore(risks, order = "desc") {
    return risks.sort((a, b) => {
      return order === "desc" ? b.riskScore - a.riskScore : a.riskScore - b.riskScore;
    });
  }

  // Get risk statistics
  getRiskStatistics(risks) {
    const stats = {
      total: risks.length,
      byCategory: {},
      byProbability: {},
      byImpact: {},
      averageScore: 0
    };

    let totalScore = 0;

    risks.forEach(risk => {
      // By category
      stats.byCategory[risk.category] = (stats.byCategory[risk.category] || 0) + 1;
      
      // By probability
      stats.byProbability[risk.probability] = (stats.byProbability[risk.probability] || 0) + 1;
      
      // By impact
      stats.byImpact[risk.impact] = (stats.byImpact[risk.impact] || 0) + 1;
      
      totalScore += risk.riskScore;
    });

    stats.averageScore = risks.length > 0 ? Math.round(totalScore / risks.length) : 0;

    return stats;
  }
}

export default new RiskAssessmentService();