import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check for secret to confirm this is a valid request
  console.log(req.query.secret);
  if (req.query.secret !== process.env.NEXTJS_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const messageID: string = req.body.messageID;
  const channelID: string = req.body.channelID;

  try {
    await res.unstable_revalidate(`/edit/${channelID}/${messageID}`);
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
}
