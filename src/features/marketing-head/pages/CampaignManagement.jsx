import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Select } from '../../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { BarChart, LineChart } from '../../../components/ui/charts';
import { Badge } from '../../../components/ui/badge';
import { Select as FilterSelect } from '../../../components/ui/select';

export default function CampaignManagement() {
  const [activeTab, setActiveTab] = useState('planning');
  const [campaignFilter, setCampaignFilter] = useState('All');

  const campaigns = [
    {
      name: 'Summer Enrollment Drive',
      status: 'Active',
      progress: 65,
      startDate: '2024-03-01',
      endDate: '2024-05-31',
    },
    {
      name: 'International Student Outreach',
      status: 'Active',
      progress: 45,
      startDate: '2024-02-15',
      endDate: '2024-04-15',
    },
    {
      name: 'Alumni Engagement',
      status: 'Planning',
      progress: 20,
      startDate: '2024-04-01',
      endDate: '2024-06-30',
    },
  ];

  const filteredCampaigns = campaignFilter === 'All'
    ? campaigns
    : campaigns.filter(c => c.status === campaignFilter);

  return (
    <div className="space-y-6" data-tour="1" data-tour-title-en="Campaign Management" data-tour-title-ar="إدارة الحملات" data-tour-content-en="Plan campaigns, manage budgets, track ROI, and review metrics." data-tour-content-ar="خطط الحملات وأدر الميزانيات وتتبع العائد وراجع المقاييس." data-tour-position="bottom">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Campaign Management</h1>
        <Button>Create New Campaign</Button>
      </div>

      <Tabs defaultValue="planning" className="space-y-6" data-tour="2" data-tour-title-en="Campaign Tabs" data-tour-title-ar="علامات تبويب الحملة" data-tour-content-en="Navigate planning, budget, ROI tracking, and success metrics." data-tour-content-ar="تنقل بين التخطيط والميزانية وتتبع العائد ومقاييس النجاح.">
        <TabsList>
          <TabsTrigger value="planning">Campaign Planning</TabsTrigger>
          <TabsTrigger value="budget">Budget Planning</TabsTrigger>
          <TabsTrigger value="roi">ROI Tracking</TabsTrigger>
          <TabsTrigger value="metrics">Success Metrics</TabsTrigger>
        </TabsList>

        {/* Campaign Planning */}
        <TabsContent value="planning">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-tour="3" data-tour-title-en="Planning Overview" data-tour-title-ar="نظرة عامة على التخطيط" data-tour-content-en="Active campaigns list with filters and timeline." data-tour-content-ar="قائمة الحملات النشطة مع المرشحات والجدول الزمني.">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Active Campaigns</CardTitle>
                  <FilterSelect
                    value={campaignFilter}
                    onChange={e => setCampaignFilter(e.target.value)}
                    className="w-40"
                  >
                    <option value="All">All Campaigns</option>
                    <option value="Active">Active</option>
                    <option value="Planning">Planning</option>
                  </FilterSelect>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredCampaigns.map((campaign, index) => (
                    <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{campaign.name}</h3>
                          <p className="text-sm text-gray-500">
                            {campaign.startDate} - {campaign.endDate}
                          </p>
                        </div>
                        <Badge className={campaign.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {campaign.status}
                        </Badge>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${campaign.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{campaign.progress}% Complete</p>
                    </div>
                  ))}
                  {filteredCampaigns.length === 0 && (
                    <div className="text-center text-gray-400 py-8">No campaigns found for this filter.</div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Campaign Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <LineChart
                    data={[
                      { name: 'Jan', leads: 400, conversions: 240 },
                      { name: 'Feb', leads: 300, conversions: 139 },
                      { name: 'Mar', leads: 200, conversions: 980 },
                      { name: 'Apr', leads: 278, conversions: 390 },
                      { name: 'May', leads: 189, conversions: 480 },
                    ]}
                    categories={['leads', 'conversions']}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Budget Planning */}
        <TabsContent value="budget">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-tour="4" data-tour-title-en="Budget Planning" data-tour-title-ar="تخطيط الميزانية" data-tour-content-en="Allocation by channel and budget vs actuals." data-tour-content-ar="التوزيع حسب القناة والميزانية مقابل الفعلي.">
            <Card>
              <CardHeader>
                <CardTitle>Budget Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: 'Digital Marketing', allocated: 50000, spent: 35000 },
                    { category: 'Events', allocated: 30000, spent: 15000 },
                    { category: 'Print Media', allocated: 20000, spent: 12000 },
                    { category: 'Social Media', allocated: 25000, spent: 18000 },
                  ].map((item, index) => (
                    <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex justify_between items-center mb-2">
                        <h3 className="font-medium">{item.category}</h3>
                        <p className="text-sm text-gray-500">
                          ${item.spent.toLocaleString()} / ${item.allocated.toLocaleString()}
                        </p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${(item.spent / item.allocated) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Budget vs Actual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <BarChart
                    data={[
                      { name: 'Digital Marketing', budget: 50000, actual: 35000 },
                      { name: 'Events', budget: 30000, actual: 15000 },
                      { name: 'Print Media', budget: 20000, actual: 12000 },
                      { name: 'Social Media', budget: 25000, actual: 18000 },
                    ]}
                    categories={['budget', 'actual']}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ROI Tracking */}
        <TabsContent value="roi">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-tour="5" data-tour-title-en="ROI Tracking" data-tour-title-ar="تتبع العائد" data-tour-content-en="Campaign ROI list and quarterly trend."
               data-tour-content-ar="قائمة عوائد الحملة والاتجاه الفصلي.">
            <Card>
              <CardHeader>
                <CardTitle>Campaign ROI</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { campaign: 'Summer Enrollment', investment: 50000, revenue: 250000, roi: '5x' },
                    { campaign: 'International Outreach', investment: 30000, revenue: 180000, roi: '6x' },
                    { campaign: 'Alumni Engagement', investment: 20000, revenue: 120000, roi: '6x' },
                  ].map((item, index) => (
                    <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex justify_between items-center">
                        <div>
                          <h3 className="font-medium">{item.campaign}</h3>
                          <p className="text-sm text-gray-500">
                            Investment: ${item.investment.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-500">ROI: {item.roi}</p>
                          <p className="text-sm text-gray-500">
                            Revenue: ${item.revenue.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ROI Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <LineChart
                    data={[
                      { name: 'Q1', roi: 4.2 },
                      { name: 'Q2', roi: 4.5 },
                      { name: 'Q3', roi: 4.8 },
                      { name: 'Q4', roi: 5.2 },
                    ]}
                    categories={['roi']}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Success Metrics */}
        <TabsContent value="metrics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-tour="6" data-tour-title-en="Success Metrics" data-tour-title-ar="مقاييس النجاح" data-tour-content-en="KPIs and campaign performance."
               data-tour-content-ar="مؤشرات الأداء وأداء الحملة.">
            <Card>
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { metric: 'Lead Generation', target: 1000, achieved: 850, unit: 'leads' },
                    { metric: 'Conversion Rate', target: 25, achieved: 22, unit: '%' },
                    { metric: 'Cost per Lead', target: 50, achieved: 45, unit: '$' },
                    { metric: 'Response Time', target: 24, achieved: 20, unit: 'hours' },
                  ].map((item, index) => (
                    <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex justify_between items-center">
                        <div>
                          <h3 className="font-medium">{item.metric}</h3>
                          <p className="text-sm text-gray-500">
                            Target: {item.target}{item.unit}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {item.achieved}{item.unit}
                          </p>
                          <p className={`${item.achieved >= item.target ? 'text-green-500' : 'text-red-500'} text-sm`}>
                            {((item.achieved / item.target) * 100).toFixed(1)}% of target
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <BarChart
                    data={[
                      { name: 'Lead Quality', score: 85 },
                      { name: 'Engagement Rate', score: 78 },
                      { name: 'Conversion Rate', score: 65 },
                      { name: 'ROI', score: 92 },
                    ]}
                    categories={['score']}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 