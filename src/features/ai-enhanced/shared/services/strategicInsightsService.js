import aiService from "../../../../services/aiService";
import aiLanguageService from "../../../../services/aiLanguageService";

class StrategicInsightsService {
  constructor() {
    this.insightsHistory = [];
  }

  // Main function to generate strategic insights
  async generateInsights(params) {
    try {
      const prompt = this.buildInsightsPrompt(params);
      const aiResponse = await aiService.generateResponse(
        prompt,
        "director",
        [], // chatHistory - empty array
        "en" // currentUILanguage - default to English
      );
      return this.processInsightsResponse(aiResponse, params);
    } catch (error) {
      console.error('Error generating insights:', error);
      return this.getFallbackInsights(params);
    }
  }

  // Build AI prompt for strategic insights
  buildInsightsPrompt(params) {
    const { period, focus, context } = params;
    
    return `As a university strategic planning expert, analyze the following university data and provide comprehensive strategic insights.

University Context: ${context || 'General university operations'}

Analysis Focus: ${focus}
Time Period: ${period}

Please provide detailed strategic analysis covering:
1. Executive Summary - Key findings and overall assessment
2. Key Metrics - Critical performance indicators and trends
3. Strategic Insights - Deep analysis of opportunities and challenges
4. Risk Assessment - Potential risks and mitigation strategies
5. Opportunities - Growth and improvement opportunities
6. Recommendations - Actionable strategic recommendations

Format your response as structured JSON with this exact structure:
{
  "executiveSummary": "Comprehensive executive summary of findings",
  "keyMetrics": [
    {
      "metric": "metric name",
      "value": "current value",
      "trend": "improving|stable|declining",
      "target": "target value",
      "priority": "high|medium|low"
    }
  ],
  "insights": [
    {
      "category": "category name",
      "title": "insight title",
      "description": "detailed insight description",
      "impact": "high|medium|low",
      "urgency": "immediate|short-term|long-term"
    }
  ],
  "risks": [
    {
      "risk": "risk description",
      "probability": "high|medium|low",
      "impact": "high|medium|low",
      "mitigation": "mitigation strategy"
    }
  ],
  "opportunities": [
    {
      "opportunity": "opportunity description",
      "potential": "high|medium|low",
      "effort": "high|medium|low",
      "timeline": "immediate|short-term|long-term"
    }
  ],
  "recommendations": [
    {
      "recommendation": "recommendation description",
      "priority": "high|medium|low",
      "timeline": "immediate|short-term|long-term",
      "resources": "resource requirements"
    }
  ]
}`;
  }

  // Get strategic guidance based on focus area
  getStrategicGuidance(focus) {
    const guidance = {
      'academic': 'Focus on academic excellence, curriculum development, faculty quality, and student outcomes.',
      'financial': 'Analyze financial health, budget optimization, revenue streams, and cost management.',
      'operational': 'Review operational efficiency, process optimization, and resource utilization.',
      'technology': 'Assess technology infrastructure, digital transformation, and innovation initiatives.',
      'enrollment': 'Examine enrollment trends, student recruitment, retention strategies, and market positioning.',
      'research': 'Evaluate research capabilities, funding opportunities, and academic partnerships.',
      'overall': 'Provide comprehensive strategic analysis across all university functions.'
    };
    return guidance[focus] || guidance['overall'];
  }

  // Process AI insights response
  // Process AI insights response
  processInsightsResponse(aiResponse, params) {
    try {
      // Get content from AI response object
      const responseText = typeof aiResponse === "string" ? aiResponse : aiResponse.content;
      
      if (!responseText) {
        throw new Error("No content in AI response");
      }
      
      // Try multiple approaches to extract and parse JSON
      let insights;
      
      // Approach 1: Try to find and parse JSON block directly
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          insights = JSON.parse(jsonMatch[0]);
        } catch (parseError) {
          console.warn("Direct JSON parse failed, trying to clean the response:", parseError);
          
          // Approach 2: Try to clean and parse JSON
          try {
            const cleanedJson = this.cleanJsonString(jsonMatch[0]);
            insights = JSON.parse(cleanedJson);
          } catch (cleanError) {
            console.warn("Cleaned JSON parse failed, trying advanced cleaning:", cleanError);
            
            // Approach 3: Try advanced JSON cleaning
            try {
              const advancedCleanedJson = this.advancedCleanJsonString(jsonMatch[0]);
              insights = JSON.parse(advancedCleanedJson);
            } catch (advancedError) {
              console.warn("Advanced cleaning failed, trying to extract partial data:", advancedError);
              
              // Approach 4: Try to extract partial data and construct valid JSON
              try {
                insights = this.extractPartialInsights(jsonMatch[0]);
              } catch (extractError) {
                console.warn("Partial extraction failed, using fallback:", extractError);
                throw new Error("All JSON parsing attempts failed");
              }
            }
          }
        }
      } else {
        throw new Error("No valid JSON found in AI response");
      }

      // Validate and enhance the insights
      return this.validateAndEnhanceInsights(insights, params);
      
    } catch (error) {
      console.error("Error processing insights response:", error);
      return this.getFallbackInsights(params);
    }
  }

  // Clean JSON string to fix common issues
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
  
  // Extract partial insights when JSON is too malformed
  extractPartialInsights(jsonString) {
    console.log("Attempting to extract partial insights from malformed JSON");
    
    // Try to extract key information using regex patterns
    const executiveSummary = this.extractValue(jsonString, 'executiveSummary') || 
                           this.extractValue(jsonString, 'summary') || 
                           "Strategic analysis completed with partial data extraction.";
    
    const keyMetrics = this.extractArray(jsonString, 'keyMetrics') || [];
    const insights = this.extractArray(jsonString, 'insights') || [];
    const risks = this.extractArray(jsonString, 'risks') || [];
    const opportunities = this.extractArray(jsonString, 'opportunities') || [];
    const recommendations = this.extractArray(jsonString, 'recommendations') || [];
    
    return {
      executiveSummary,
      keyMetrics,
      insights,
      risks,
      opportunities,
      recommendations
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
  // Validate and enhance insights data
  validateAndEnhanceInsights(insights, params) {
    const enhanced = {
      executiveSummary: insights.executiveSummary || "Strategic analysis completed successfully",
      keyMetrics: (insights.keyMetrics || []).map(metric => ({
        metric: metric.metric || "Unknown Metric",
        value: metric.value || "N/A",
        trend: metric.trend || "stable",
        target: metric.target || "N/A",
        priority: metric.priority || "medium"
      })),
      insights: (insights.insights || []).map(insight => ({
        category: insight.category || "General",
        title: insight.title || "Strategic Insight",
        description: insight.description || "No description available",
        impact: insight.impact || "medium",
        urgency: insight.urgency || "short-term"
      })),
      risks: (insights.risks || []).map(risk => ({
        risk: risk.risk || "Unknown Risk",
        probability: risk.probability || "medium",
        impact: risk.impact || "medium",
        mitigation: risk.mitigation || "Review and address"
      })),
      opportunities: (insights.opportunities || []).map(opp => ({
        opportunity: opp.opportunity || "Unknown Opportunity",
        potential: opp.potential || "medium",
        effort: opp.effort || "medium",
        timeline: opp.timeline || "short-term"
      })),
      recommendations: (insights.recommendations || []).map(rec => ({
        recommendation: rec.recommendation || "Review and implement",
        priority: rec.priority || "medium",
        timeline: rec.timeline || "short-term",
        resources: rec.resources || "Standard resources"
      })),
      analysisId: Date.now(),
      period: params.period,
      focus: params.focus,
      generatedAt: new Date().toISOString(),
      isAI: true
    };

    return enhanced;
  }

  // Fallback insights when AI fails
  getFallbackInsights(params) {
    return {
      executiveSummary: `Based on ${params.period} analysis focusing on ${params.focus}, the university shows strong potential for strategic growth and operational optimization. Key areas for improvement include academic excellence, financial sustainability, and technological advancement.`,
      keyMetrics: [
        {
          metric: "Student Enrollment",
          value: "12,500",
          trend: "improving",
          target: "15,000",
          priority: "high"
        },
        {
          metric: "Graduation Rate",
          value: "78%",
          trend: "stable",
          target: "85%",
          priority: "high"
        },
        {
          metric: "Research Funding",
          value: "$2.5M",
          trend: "improving",
          target: "$3.5M",
          priority: "medium"
        },
        {
          metric: "Faculty Satisfaction",
          value: "4.2/5",
          trend: "stable",
          target: "4.5/5",
          priority: "medium"
        },
        {
          metric: "Financial Health",
          value: "Good",
          trend: "stable",
          target: "Excellent",
          priority: "high"
        },
        {
          metric: "Technology Adoption",
          value: "75%",
          trend: "improving",
          target: "90%",
          priority: "medium"
        }
      ],
      insights: [
        {
          category: "Academic Excellence",
          title: "Curriculum Modernization Opportunity",
          description: "Current curriculum shows gaps in emerging technologies and industry-relevant skills. Modernization could significantly improve graduate employability.",
          impact: "high",
          urgency: "short-term"
        },
        {
          category: "Financial Sustainability",
          title: "Revenue Diversification Potential",
          description: "Heavy reliance on tuition revenue presents risk. Diversification through research partnerships and continuing education could improve financial stability.",
          impact: "high",
          urgency: "medium-term"
        },
        {
          category: "Operational Efficiency",
          title: "Process Automation Benefits",
          description: "Administrative processes show opportunities for automation, potentially reducing costs and improving service delivery.",
          impact: "medium",
          urgency: "long-term"
        }
      ],
      risks: [
        {
          risk: "Enrollment Decline",
          probability: "medium",
          impact: "high",
          mitigation: "Implement comprehensive recruitment strategy and improve student experience"
        },
        {
          risk: "Technology Obsolescence",
          probability: "high",
          impact: "medium",
          mitigation: "Develop technology roadmap and invest in modern infrastructure"
        }
      ],
      opportunities: [
        {
          opportunity: "Online Program Expansion",
          potential: "high",
          effort: "medium",
          timeline: "short-term"
        },
        {
          opportunity: "Industry Partnerships",
          potential: "high",
          effort: "high",
          timeline: "medium-term"
        }
      ],
      recommendations: [
        {
          recommendation: "Develop comprehensive strategic plan with clear objectives and timelines",
          priority: "high",
          timeline: "immediate",
          resources: "Strategic planning team and external consultants"
        },
        {
          recommendation: "Invest in faculty development and retention programs",
          priority: "high",
          timeline: "short-term",
          resources: "HR department and training budget"
        },
        {
          recommendation: "Implement technology modernization initiative",
          priority: "medium",
          timeline: "medium-term",
          resources: "IT department and technology budget"
        }
      ],
      analysisId: Date.now(),
      period: params.period,
      focus: params.focus,
      generatedAt: new Date().toISOString(),
      isAI: false,
      dataSource: "Fallback Analysis"
    };
  }

  // Generate unique analysis ID
  generateAnalysisId() {
    return "insights_" + Math.random().toString(36).substr(2, 9);
  }

  // Get insights history
  getInsightsHistory() {
    try {
      const history = localStorage.getItem("strategicInsightsHistory");
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error("Error loading insights history:", error);
      return [];
    }
  }

  // Save insights to history
  saveToHistory(insights) {
    try {
      const history = this.getInsightsHistory();
      const newEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        period: insights.period,
        focus: insights.focus,
        insightsCount: insights.insights?.length || 0,
        risksCount: insights.risks?.length || 0,
        opportunitiesCount: insights.opportunities?.length || 0
      };
      
      history.unshift(newEntry);
      
      // Keep only last 10 analyses
      if (history.length > 10) {
        history.splice(10);
      }
      
      localStorage.setItem("strategicInsightsHistory", JSON.stringify(history));
    } catch (error) {
      console.error("Error saving insights history:", error);
    }
  }

  // Get available focus areas
  getFocusAreas() {
    return [
      { value: 'overall', label: 'Overall Strategic Analysis' },
      { value: 'academic', label: 'Academic Excellence' },
      { value: 'financial', label: 'Financial Management' },
      { value: 'operational', label: 'Operational Efficiency' },
      { value: 'technology', label: 'Technology & Innovation' },
      { value: 'enrollment', label: 'Enrollment & Student Success' },
      { value: 'research', label: 'Research & Development' }
    ];
  }

  // Get available time periods
  getTimePeriods() {
    return [
      { value: 'quarterly', label: 'Quarterly Analysis' },
      { value: 'annual', label: 'Annual Analysis' },
      { value: '3-year', label: '3-Year Strategic Plan' },
      { value: '5-year', label: '5-Year Strategic Plan' }
    ];
  }
}

export default new StrategicInsightsService();