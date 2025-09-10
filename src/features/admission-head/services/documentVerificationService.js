import aiService from '../../../services/aiService';
import aiLanguageService from '../../../services/aiLanguageService';

class DocumentVerificationService {
  constructor() {
    this.verificationHistory = [];
    this.verificationCriteria = {
      "High School Certificate": [
        "Official seal and signature verification",
        "Graduation date within last 3 years",
        "Minimum GPA requirements met",
        "Institution accreditation verified",
        "Document authenticity check"
      ],
      "Identity Document": [
        "Clear photo and personal details",
        "Valid expiration date",
        "Government-issued document",
        "Name matches application",
        "Document quality assessment"
      ],
      "Academic Transcript": [
        "Complete academic record",
        "Official institution letterhead",
        "Grade point average calculation",
        "Course completion verification",
        "Transcript authenticity"
      ],
      "Recommendation Letter": [
        "Official letterhead and signature",
        "Recommender credentials verification",
        "Content relevance assessment",
        "Date and authenticity check",
        "Professional quality evaluation"
      ],
      "English Proficiency Test": [
        "Valid test center verification",
        "Score authenticity check",
        "Test date validity",
        "Minimum score requirements",
        "Test format verification"
      ],
      "Medical Certificate": [
        "Medical practitioner credentials",
        "Health status verification",
        "Certificate date validity",
        "Required medical tests included",
        "Official medical stamp"
      ],
      "Financial Statement": [
        "Bank statement authenticity",
        "Sufficient funds verification",
        "Statement date validity",
        "Account holder verification",
        "Currency and amount check"
      ],
      "Passport Copy": [
        "Passport validity check",
        "Photo page clarity",
        "Personal details verification",
        "Expiration date check",
        "Document quality assessment"
      ]
    };
  }

  // Main document verification function
  async verifyDocument(documentData, language = 'en') {
    try {
      console.log('Document Verification:', documentData, 'Language:', language);
      
      if (!documentData || !documentData.documentType) {
        throw new Error('Invalid document data provided');
      }

      const criteria = this.verificationCriteria[documentData.documentType] || [];
      
      const prompt = this.buildVerificationPrompt(documentData, criteria, language);
      const aiResponse = await aiService.generateResponse(
        prompt,
        'admission-head',
        [],
        language
      );

      const verificationResult = this.processVerificationResult(
        aiResponse.content,
        documentData,
        language
      );

      // Add to history
      this.addToHistory(verificationResult);

      return verificationResult;

    } catch (error) {
      console.error('Document verification error:', error);
      return this.getFallbackResult(documentData, error.message, language);
    }
  }

  // Build AI prompt for document verification
  buildVerificationPrompt(documentData, criteria, language) {
    const criteriaText = criteria.map((criterion, index) => 
      `${index + 1}. ${criterion}`
    ).join('\n');

    return `As an AI document verification system for university admissions, please verify the following document:

**Document Information:**
- Student Name: ${documentData.studentName || 'Not provided'}
- Document Type: ${documentData.documentType}
- Document Number: ${documentData.documentNumber || 'Not provided'}
- File Name: ${documentData.fileName || 'Not provided'}
- Upload Date: ${documentData.uploadDate || 'Not provided'}
- File Size: ${documentData.fileSize || 'Not provided'}

**Verification Criteria for ${documentData.documentType}:**
${criteriaText}

Please provide a comprehensive verification analysis including:

1. **Document Authenticity Assessment** (0-100 score)
2. **Completeness Check** (0-100 score)
3. **Compliance with Admission Requirements** (0-100 score)
4. **Quality Assessment** (0-100 score)
5. **Overall Verification Status** (APPROVED/REJECTED/NEEDS_REVIEW)
6. **Specific Issues Found** (if any)
7. **Recommendations for Improvement** (if rejected or needs review)
8. **Risk Factors** (if any)
9. **Next Steps** for the student

**Response Format:**
- Use clear headings for each section
- Provide specific scores and reasoning
- Be professional and constructive
- Focus on actionable feedback

Respond in ${language === 'ar' ? 'Arabic' : 'English'} with detailed analysis.`;
  }

  // Process AI response into structured result
  processVerificationResult(aiResponse, documentData, language) {
    const result = {
      id: Date.now(),
      documentId: documentData.id,
      studentName: documentData.studentName,
      documentType: documentData.documentType,
      documentNumber: documentData.documentNumber,
      fileName: documentData.fileName,
      status: this.extractStatus(aiResponse),
      scores: this.extractScores(aiResponse),
      aiAnalysis: aiResponse,
      issues: this.extractIssues(aiResponse),
      recommendations: this.extractRecommendations(aiResponse),
      riskFactors: this.extractRiskFactors(aiResponse),
      nextSteps: this.extractNextSteps(aiResponse),
      verifiedAt: new Date().toISOString(),
      verifiedBy: 'AI Document Verification System',
      language: language
    };

    return result;
  }

  // Extract verification status from AI response
  extractStatus(response) {
    const responseLower = response.toLowerCase();
    if (responseLower.includes('approved') && !responseLower.includes('not approved')) {
      return 'approved';
    } else if (responseLower.includes('rejected') || responseLower.includes('reject')) {
      return 'rejected';
    } else {
      return 'needs_review';
    }
  }

  // Extract scores from AI response
  extractScores(response) {
    const scores = {};
    const scorePattern = /(\w+)\s*[:\-]?\s*(\d+)\s*\/?\s*100/gi;
    let match;

    while ((match = scorePattern.exec(response)) !== null) {
      const category = match[1].toLowerCase().replace(/\s+/g, '_');
      const score = parseInt(match[2]);
      if (!isNaN(score) && score >= 0 && score <= 100) {
        scores[category] = score;
      }
    }

    return scores;
  }

  // Extract issues from AI response
  extractIssues(response) {
    const issues = [];
    const issuePattern = /(?:issue|problem|concern|discrepancy)[:\-]?\s*([^.\n]+)/gi;
    let match;

    while ((match = issuePattern.exec(response)) !== null) {
      const issue = match[1].trim();
      if (issue && !issues.includes(issue)) {
        issues.push(issue);
      }
    }

    return issues;
  }

  // Extract recommendations from AI response
  extractRecommendations(response) {
    const recommendations = [];
    const recPattern = /(?:recommend|suggest|advise)[:\-]?\s*([^.\n]+)/gi;
    let match;

    while ((match = recPattern.exec(response)) !== null) {
      const rec = match[1].trim();
      if (rec && !recommendations.includes(rec)) {
        recommendations.push(rec);
      }
    }

    return recommendations;
  }

  // Extract risk factors from AI response
  extractRiskFactors(response) {
    const risks = [];
    const riskPattern = /(?:risk|concern|warning)[:\-]?\s*([^.\n]+)/gi;
    let match;

    while ((match = riskPattern.exec(response)) !== null) {
      const risk = match[1].trim();
      if (risk && !risks.includes(risk)) {
        risks.push(risk);
      }
    }

    return risks;
  }

  // Extract next steps from AI response
  extractNextSteps(response) {
    const steps = [];
    const stepPattern = /(?:next step|action|follow|proceed)[:\-]?\s*([^.\n]+)/gi;
    let match;

    while ((match = stepPattern.exec(response)) !== null) {
      const step = match[1].trim();
      if (step && !steps.includes(step)) {
        steps.push(step);
      }
    }

    return steps;
  }

  // Get fallback result for errors
  getFallbackResult(documentData, errorMessage, language) {
    return {
      id: Date.now(),
      documentId: documentData.id,
      studentName: documentData.studentName,
      documentType: documentData.documentType,
      status: 'needs_review',
      scores: {
        authenticity: 0,
        completeness: 0,
        compliance: 0,
        quality: 0
      },
      aiAnalysis: language === 'ar' ? 
        'حدث خطأ في التحقق من الوثيقة. يرجى المحاولة مرة أخرى أو الاتصال بالدعم الفني.' :
        'An error occurred during document verification. Please try again or contact technical support.',
      issues: [errorMessage],
      recommendations: [
        language === 'ar' ? 
          'يرجى إعادة رفع الوثيقة أو الاتصال بالدعم الفني' :
          'Please re-upload the document or contact technical support'
      ],
      riskFactors: [],
      nextSteps: [
        language === 'ar' ? 
          'مراجعة يدوية للوثيقة' :
          'Manual document review required'
      ],
      verifiedAt: new Date().toISOString(),
      verifiedBy: 'AI System (Error)',
      language: language,
      error: errorMessage
    };
  }

  // Add verification to history
  addToHistory(verificationResult) {
    this.verificationHistory.unshift(verificationResult);
    
    // Keep only last 100 verifications
    if (this.verificationHistory.length > 100) {
      this.verificationHistory = this.verificationHistory.slice(0, 100);
    }
  }

  // Get verification history
  getVerificationHistory(limit = 50) {
    return this.verificationHistory.slice(0, limit);
  }

  // Get verification statistics
  getVerificationStats() {
    const total = this.verificationHistory.length;
    if (total === 0) return { total: 0, approved: 0, rejected: 0, needs_review: 0 };

    const stats = this.verificationHistory.reduce((acc, verification) => {
      acc[verification.status] = (acc[verification.status] || 0) + 1;
      return acc;
    }, {});

    return {
      total,
      approved: stats.approved || 0,
      rejected: stats.rejected || 0,
      needs_review: stats.needs_review || 0,
      approval_rate: total > 0 ? Math.round((stats.approved || 0) / total * 100) : 0
    };
  }

  // Bulk verify documents
  async bulkVerifyDocuments(documents, language = 'en') {
    const results = [];
    
    for (const document of documents) {
      try {
        const result = await this.verifyDocument(document, language);
        results.push(result);
        
        // Add delay between requests to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        results.push(this.getFallbackResult(document, error.message, language));
      }
    }

    return results;
  }

  // Get document types
  getDocumentTypes() {
    return Object.keys(this.verificationCriteria);
  }

  // Get verification criteria for document type
  getVerificationCriteria(documentType) {
    return this.verificationCriteria[documentType] || [];
  }
}

// Create and export singleton instance
const documentVerificationService = new DocumentVerificationService();
export default documentVerificationService;