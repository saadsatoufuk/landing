import mongoose from 'mongoose';
import Site from '../lib/models/Site';
import { getDefaultSiteData } from '../lib/defaultSiteData';

const MONGODB_URI = process.env.MONGODB_URI || '';

async function seed() {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Delete existing
    await Site.deleteMany({});
    console.log('Cleared existing sites');

    // Create first site (default)
    const site1Data = getDefaultSiteData('default');
    const site1 = await Site.create(site1Data);
    console.log('Created site:', site1.subdomain, '- ', site1.global.siteName);

    // Create second site (demo) with different branding
    const site2Data = getDefaultSiteData('demo');
    site2Data.global.siteName = 'موقع تجريبي';
    site2Data.global.primaryColor = '#10B981';
    site2Data.navbar.logo = 'موقع تجريبي';
    site2Data.footer.logo = 'موقع تجريبي';
    site2Data.hero.headline = 'اكتشف الحل الأمثل';
    site2Data.hero.headlineHighlight = 'لأعمالك الرقمية';
    site2Data.hero.subheadline = 'منصة متكاملة تساعدك على إدارة أعمالك بكفاءة وسهولة. ابدأ الآن واستمتع بتجربة فريدة.';
    site2Data.global.seo.title = 'موقع تجريبي - حلول رقمية متكاملة';
    site2Data.global.seo.description = 'اكتشف الحل الأمثل لأعمالك الرقمية مع منصتنا المتكاملة';
    site2Data.footer.bottomText = '© 2025 موقع تجريبي. جميع الحقوق محفوظة.';
    const site2 = await Site.create(site2Data);
    console.log('Created site:', site2.subdomain, '- ', site2.global.siteName);

    console.log('\nSeed complete! Created', 2, 'sites.');
    console.log('Visit /site/default and /site/demo to see them.');
    await mongoose.disconnect();
}

seed().catch(console.error);
