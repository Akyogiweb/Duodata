export const videos = [
  { id: 'rUocvLAq-Gk', category: 'Main Product', title: 'Duodata Metrics Ontology and Platform Agents', start: 9 },
  { id: 'WB5hp94zpCc', category: 'Use Case', title: 'How to talk to your data with AI — Self-service BI with Duodata', start: 316 },
  { id: 'GESHr4irRmc', category: 'Integration', title: 'Govern Metrics Across Snowflake and Databricks', start: 547 },
  { id: 'f19-h-QsYTo', category: 'Integration', title: 'From Business Metrics to Snowflake Semantic Views', start: 194 },
  { id: '6HJVm2tHdAg', category: 'Product', title: 'Business-Approved Metrics Layer for Snowflake', start: 9 },
  { id: 'tW71VuKqmfY', category: 'Snowflake', title: 'Metric Trust, Semantic Views & Cortex Analyst', start: 31 },
  { id: '2Tg0AJz2auU', category: 'Databricks', title: 'Built-On Databricks Startup Challenge 2025', start: 0 },
].map((video) => ({
  ...video,
  thumbnail: `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
  thumbnailFallback: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
  watchUrl: `https://www.youtube.com/watch?v=${video.id}${video.start ? `&t=${video.start}s` : ''}`,
}));