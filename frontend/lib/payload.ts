export async function fetchPage(slug: string) {
  const cmsUrl = (typeof window === "undefined" ? "http://cms:3000" : process.env.NEXT_PUBLIC_CMS_URL) || 'http://cms:3000';
  
  try {
    const res = await fetch(`${cmsUrl}/api/pages?where[slug][equals]=${slug}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    
    if (!data.docs || data.docs.length === 0) {
      return null;
    }

    return data.docs[0];
  } catch (error) {
    console.error(`Failed to fetch page data for slug ${slug}:`, error);
    return null;
  }
}

export async function fetchGlobal(slug: string) {
  const cmsUrl = (typeof window === "undefined" ? "http://cms:3000" : process.env.NEXT_PUBLIC_CMS_URL) || 'http://cms:3000';
  
  try {
    const res = await fetch(`${cmsUrl}/api/globals/${slug}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error(`Failed to fetch global data for slug ${slug}:`, error);
    return null;
  }
}
