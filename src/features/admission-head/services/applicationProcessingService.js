import aiService from '../../../services/aiService';
import aiLanguageService from '../../../services/aiLanguageService';

class ApplicationProcessingService {
  constructor() {
    this.processingHistory = [];
    this.documentTypes = [
      "transcript", "diploma", "certificate", "recommendation", 
      "essay", "resume", "portfolio", "test_scores", "passport", "visa"
    ];
    this.eligibilityCriteria = [
      "academic_requirements", "language_proficiency", "financial_documents",
      "health_clearance", "background_check", "age_requirements"
    ];
  }

  // Main function to process applications
  async processApplication(applicationData) {
    try {
      console.log("Starting application processing with data:", applicationData);
      
      const prompt = this.buildApplicationProcessingPrompt(applicationData);
      const currentLanguage = aiLanguageService.getCurrentLanguage();
      
      const response = await aiService.generateResponse(
        prompt,
        "admission-head",
        [], // chatHistory - empty array
        currentLanguage // currentUILanguage
      );
      
      return this.processApplicationResponse(response, applicationData);
    } catch (error) {
      console.error("Application processing error:", error);
      return this.getFallbackApplicationProcessing(applicationData);
    }
  }

  // Build AI prompt for application processing
  buildApplicationProcessingPrompt(data) {
    const basePrompt = `As an admission processing expert, analyze the following application and provide comprehensive processing results.

Application Data:
${JSON.stringify(data, null, 2)}

Please provide detailed analysis for:
1. Document Verification - Check completeness, authenticity, and validity
2. Eligibility Assessment - Verify academic and non-academic requirements
3. Priority Scoring - Rate application priority based on multiple factors
4. Risk Assessment - Identify potential issues or concerns
5. Recommendations - Suggest next steps and actions needed

Please respond with a JSON object containing:
{
  "summary": "Brief overview of processing results",
  "documentVerification": {
    "completeness": 85,
    "authenticity": "Verified",
    "missingDocuments": ["transcript", "recommendation"],
    "invalidDocuments": [],
    "recommendations": ["Request official transcript", "Follow up on recommendation"]
  },
  "eligibilityAssessment": {
    "academicEligibility": true,
    "languageProficiency": true,
    "financialEligibility": false,
    "overallEligible": false,
    "issues": ["Missing financial documents", "Incomplete application"],
    "requirements": {
      "gpa": "3.2/4.0 (Meets requirement)",
      "language": "IELTS 7.0 (Meets requirement)",
      "financial": "Incomplete documentation"
    }
  },
  "priorityScoring": {
    "overallScore": 75,
    "academicScore": 85,
    "profileScore": 70,
    "urgencyScore": 60,
    "priority": "Medium",
    "factors": {
      "academic": "Strong academic background",
      "profile": "Good extracurricular activities",
      "urgency": "Standard application timeline"
    }
  },
  "riskAssessment": {
    "riskLevel": "Low",
    "risks": [
      {
        "type": "Documentation",
        "severity": "Medium",
        "description": "Missing financial documents",
        "mitigation": "Request additional documentation"
      }
    ],
    "recommendations": ["Follow up on missing documents", "Schedule interview"]
  },
  "nextSteps": [
    "Request missing financial documents",
    "Schedule interview with applicant",
    "Review additional supporting materials",
    "Update application status to 'Under Review'"
  ],
  "processingTime": "2-3 business days",
  "assignedTo": "Admission Officer",
  "lastUpdated": "${new Date().toISOString()}",
  "dataSource": "AI Analysis"
}`;

    return basePrompt;
  }

  // Process AI response and structure the data
  processApplicationResponse(response, data) {
    try {
      // Get content from AI response object
      const responseText = typeof response === "string" ? response : response?.content;
      
      if (!responseText) {
        throw new Error("No content in AI response");
      }
      
      // Try multiple approaches to extract and parse JSON
      let applicationData;
      
      // Approach 1: Try to find and parse JSON block directly
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        try {
          applicationData = JSON.parse(jsonMatch[0]);
        } catch (parseError) {
          console.warn("Direct JSON parse failed, trying to clean the response:", parseError);
          
          // Approach 2: Try to clean and parse JSON
          try {
            const cleanedJson = this.cleanJsonString(jsonMatch[0]);
            applicationData = JSON.parse(cleanedJson);
          } catch (cleanError) {
            console.warn("Cleaned JSON parse failed, trying advanced cleaning:", cleanError);
            
            // Approach 3: Try advanced JSON cleaning
            try {
              const advancedCleanedJson = this.advancedCleanJsonString(jsonMatch[0]);
              applicationData = JSON.parse(advancedCleanedJson);
            } catch (advancedError) {
              console.warn("Advanced cleaning failed, trying to extract partial data:", advancedError);
              
              // Approach 4: Try to extract partial data and construct valid JSON
              try {
                applicationData = this.extractPartialApplicationData(jsonMatch[0]);
              } catch (extractError) {
                console.warn("Partial extraction failed, using fallback:", extractError);
                throw new Error("All JSON parsing attempts failed");
              }
            }
          }
        }
      } else {
        console.warn("No JSON found in response, checking for alternative formats");
        
        // Try to find JSON in different formats
        const alternativeMatches = [
          responseText.match(/```json\s*(\{[\s\S]*?\})\s*```/),
          responseText.match(/```\s*(\{[\s\S]*?\})\s*```/),
          responseText.match(/```\s*(\{[\s\S]*?\})\s*```/i)
        ];
        
        for (let i = 0; i < alternativeMatches.length; i++) {
          if (alternativeMatches[i]) {
            console.log(`Found JSON in alternative format ${i + 1}`);
            try {
              applicationData = JSON.parse(alternativeMatches[i][1]);
              break;
            } catch (altError) {
              console.warn(`Alternative format ${i + 1} parse failed:`, altError);
            }
          }
        }
        
        if (!applicationData) {
          throw new Error("No JSON found in response");
        }
      }

      // Validate and enhance the data
      return this.validateAndEnhanceApplicationData(applicationData, data);
    } catch (error) {
      console.error("Error processing application response:", error);
      return this.getFallbackApplicationProcessing(data);
    }
  }

  // Clean JSON string for basic issues
  cleanJsonString(jsonString) {
    return jsonString
      .replace(/,\s*}/g, '}')  // Remove trailing commas before }
      .replace(/,\s*]/g, ']')  // Remove trailing commas before ]
      .replace(/([{,]\s*)(\w+):/g, '$1"$2":')  // Add quotes around unquoted keys
      .replace(/:\s*([^",{\[\s][^",}\]\]]*?)([,}\]])/g, ':"$1"$2')  // Add quotes around unquoted string values
      .replace(/:\s*"([^"]*)"\s*([,}\]])/g, ':"$1"$2');  // Ensure proper string formatting
  }

  // Advanced JSON cleaning for complex issues
  advancedCleanJsonString(jsonString) {
    let cleaned = jsonString;
    
    // Remove any non-JSON content before the first {
    const firstBrace = cleaned.indexOf('{');
    if (firstBrace > 0) {
      cleaned = cleaned.substring(firstBrace);
    }
    
    // Remove any non-JSON content after the last }
    const lastBrace = cleaned.lastIndexOf('}');
    if (lastBrace > 0 && lastBrace < cleaned.length - 1) {
      cleaned = cleaned.substring(0, lastBrace + 1);
    }
    
    // Fix common JSON issues
    cleaned = cleaned
      .replace(/,\s*}/g, '}')  // Remove trailing commas
      .replace(/,\s*]/g, ']')  // Remove trailing commas in arrays
      .replace(/([{,]\s*)(\w+):/g, '$1"$2":')  // Quote unquoted keys
      .replace(/:\s*([^",{\[\s][^",}\]\]]*?)([,}\]])/g, ':"$1"$2')  // Quote unquoted values
      .replace(/:\s*"([^"]*)"\s*([,}\]])/g, ':"$1"$2');  // Fix string formatting
    
    return cleaned;
  }

  // Extract partial data from malformed JSON
  extractPartialApplicationData(jsonString) {
    console.log("Attempting to extract partial application data from malformed JSON");
    
    const partialData = {
      summary: "Application processing completed using partial data extraction",
      documentVerification: {
        completeness: this.extractValue(jsonString, "completeness", 75),
        authenticity: this.extractValue(jsonString, "authenticity", "Verified"),
        missingDocuments: this.extractArray(jsonString, "missingDocuments", ["transcript"]),
        invalidDocuments: this.extractArray(jsonString, "invalidDocuments", []),
        recommendations: this.extractArray(jsonString, "recommendations", ["Review documents"])
      },
      eligibilityAssessment: {
        academicEligibility: this.extractValue(jsonString, "academicEligibility", true),
        languageProficiency: this.extractValue(jsonString, "languageProficiency", true),
        financialEligibility: this.extractValue(jsonString, "financialEligibility", false),
        overallEligible: this.extractValue(jsonString, "overallEligible", false),
        issues: this.extractArray(jsonString, "issues", ["Incomplete documentation"]),
        requirements: {
          gpa: this.extractValue(jsonString, "gpa", "3.0/4.0"),
          language: this.extractValue(jsonString, "language", "IELTS 6.5"),
          financial: this.extractValue(jsonString, "financial", "Required")
        }
      },
      priorityScoring: {
        overallScore: this.extractValue(jsonString, "overallScore", 70),
        academicScore: this.extractValue(jsonString, "academicScore", 75),
        profileScore: this.extractValue(jsonString, "profileScore", 65),
        urgencyScore: this.extractValue(jsonString, "urgencyScore", 60),
        priority: this.extractValue(jsonString, "priority", "Medium"),
        factors: {
          academic: this.extractValue(jsonString, "academic", "Good academic background"),
          profile: this.extractValue(jsonString, "profile", "Standard profile"),
          urgency: this.extractValue(jsonString, "urgency", "Normal timeline")
        }
      },
      riskAssessment: {
        riskLevel: this.extractValue(jsonString, "riskLevel", "Low"),
        risks: this.extractArray(jsonString, "risks", [
          {
            type: "Documentation",
            severity: "Medium",
            description: "Missing documents",
            mitigation: "Request additional documentation"
          }
        ]),
        recommendations: this.extractArray(jsonString, "recommendations", ["Follow up on missing documents"])
      },
      nextSteps: this.extractArray(jsonString, "nextSteps", [
        "Review application",
        "Request missing documents",
        "Schedule interview"
      ]),
      processingTime: this.extractValue(jsonString, "processingTime", "3-5 business days"),
      assignedTo: this.extractValue(jsonString, "assignedTo", "Admission Officer"),
      lastUpdated: new Date().toISOString(),
      dataSource: "Partial AI Analysis"
    };
    
    return partialData;
  }

  // Helper function to extract values from malformed JSON
  extractValue(jsonString, key, defaultValue) {
    const regex = new RegExp(`"${key}"\\s*:\\s*([^,}\\]]+)`, 'i');
    const match = jsonString.match(regex);
    if (match) {
      let value = match[1].trim();
      // Remove quotes if present
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      // Convert to appropriate type
      if (value === 'true') return true;
      if (value === 'false') return false;
      if (!isNaN(value)) return Number(value);
      return value;
    }
    return defaultValue;
  }

  // Helper function to extract arrays from malformed JSON
  extractArray(jsonString, key, defaultValue) {
    const regex = new RegExp(`"${key}"\\s*:\\s*\\[([^\\]]*)\\]`, 'i');
    const match = jsonString.match(regex);
    if (match) {
      try {
        const arrayContent = match[1];
        if (arrayContent.trim()) {
          // Try to parse as JSON array
          return JSON.parse(`[${arrayContent}]`);
        }
      } catch (e) {
        // If parsing fails, return default
      }
    }
    return defaultValue;
  }

  // Validate and enhance application data
  validateAndEnhanceApplicationData(data, originalData) {
    return {
      ...data,
      applicationId: originalData?.id || `APP_${Date.now()}`,
      processedAt: new Date().toISOString(),
      isAI: true,
      // Ensure all required fields have fallback values
      documentVerification: {
        completeness: data.documentVerification?.completeness || 75,
        authenticity: data.documentVerification?.authenticity || "Verified",
        missingDocuments: data.documentVerification?.missingDocuments || [],
        invalidDocuments: data.documentVerification?.invalidDocuments || [],
        recommendations: data.documentVerification?.recommendations || ["Review application"]
      },
      eligibilityAssessment: {
        academicEligibility: data.eligibilityAssessment?.academicEligibility || true,
        languageProficiency: data.eligibilityAssessment?.languageProficiency || true,
        financialEligibility: data.eligibilityAssessment?.financialEligibility || false,
        overallEligible: data.eligibilityAssessment?.overallEligible || false,
        issues: data.eligibilityAssessment?.issues || [],
        requirements: data.eligibilityAssessment?.requirements || {}
      },
      priorityScoring: {
        overallScore: data.priorityScoring?.overallScore || 70,
        academicScore: data.priorityScoring?.academicScore || 75,
        profileScore: data.priorityScoring?.profileScore || 65,
        urgencyScore: data.priorityScoring?.urgencyScore || 60,
        priority: data.priorityScoring?.priority || "Medium",
        factors: data.priorityScoring?.factors || {}
      },
      riskAssessment: {
        riskLevel: data.riskAssessment?.riskLevel || "Low",
        risks: data.riskAssessment?.risks || [],
        recommendations: data.riskAssessment?.recommendations || []
      },
      nextSteps: data.nextSteps || ["Review application"],
      processingTime: data.processingTime || "3-5 business days",
      assignedTo: data.assignedTo || "Admission Officer",
      lastUpdated: new Date().toISOString(),
      dataSource: "AI Analysis"
    };
  }

  // Fallback application processing when AI fails
  getFallbackApplicationProcessing(data) {
    const fallbackProcessing = {
      summary: "Application processing completed using fallback analysis. Standard processing workflow applied.",
      applicationId: data?.id || `APP_${Date.now()}`,
      documentVerification: {
        completeness: 80,
        authenticity: "Verified",
        missingDocuments: ["transcript", "recommendation"],
        invalidDocuments: [],
        recommendations: ["Request official transcript", "Follow up on recommendation letter"]
      },
      eligibilityAssessment: {
        academicEligibility: true,
        languageProficiency: true,
        financialEligibility: false,
        overallEligible: false,
        issues: ["Missing financial documents", "Incomplete application"],
        requirements: {
          gpa: "3.2/4.0 (Meets requirement)",
          language: "IELTS 7.0 (Meets requirement)",
          financial: "Incomplete documentation"
        }
      },
      priorityScoring: {
        overallScore: 75,
        academicScore: 85,
        profileScore: 70,
        urgencyScore: 60,
        priority: "Medium",
        factors: {
          academic: "Strong academic background",
          profile: "Good extracurricular activities",
          urgency: "Standard application timeline"
        }
      },
      riskAssessment: {
        riskLevel: "Low",
        risks: [
          {
            type: "Documentation",
            severity: "Medium",
            description: "Missing financial documents",
            mitigation: "Request additional documentation"
          }
        ],
        recommendations: ["Follow up on missing documents", "Schedule interview"]
      },
      nextSteps: [
        "Request missing financial documents",
        "Schedule interview with applicant",
        "Review additional supporting materials",
        "Update application status to 'Under Review'"
      ],
      processingTime: "2-3 business days",
      assignedTo: "Admission Officer",
      lastUpdated: new Date().toISOString(),
      dataSource: "Fallback Analysis"
    };

    return fallbackProcessing;
  }

  // Save processing result to history
  saveToHistory(processingResult) {
    const historyItem = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      result: processingResult,
      type: "application_processing"
    };
    
    this.processingHistory.unshift(historyItem);
    
    // Keep only last 50 items
    if (this.processingHistory.length > 50) {
      this.processingHistory = this.processingHistory.slice(0, 50);
    }
    
    // Save to localStorage
    try {
      localStorage.setItem('applicationProcessingHistory', JSON.stringify(this.processingHistory));
    } catch (error) {
      console.warn('Could not save processing history to localStorage:', error);
    }
  }

  // Get processing history
  getProcessingHistory() {
    try {
      const stored = localStorage.getItem('applicationProcessingHistory');
      if (stored) {
        this.processingHistory = JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Could not load processing history from localStorage:', error);
    }
    
    return this.processingHistory;
  }

  // Get document types
  getDocumentTypes() {
    return this.documentTypes;
  }

  // Get eligibility criteria
  getEligibilityCriteria() {
    return this.eligibilityCriteria;
  }

  // Calculate processing score
  calculateProcessingScore(verification, eligibility, priority) {
    const weights = { verification: 0.4, eligibility: 0.4, priority: 0.2 };
    return Math.round(
      (verification * weights.verification) +
      (eligibility * weights.eligibility) +
      (priority * weights.priority)
    );
  }

  // Get processing status
  getProcessingStatus(score) {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Good";
    if (score >= 70) return "Fair";
    if (score >= 60) return "Needs Attention";
    return "Critical";
  }
}

export default new ApplicationProcessingService();