import { getAuth, clerkClient } from '@clerk/express';

export const requireAuth = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const user = await clerkClient.users.getUser(userId);
    req.userId = userId;
    req.userName =
      user.fullName || user.emailAddresses?.[0]?.emailAddress || 'User';
    req.isAdmin = user.publicMetadata?.role === 'admin';
    next();
  } catch (err) {
    res.status(401).json({ message: 'Auth failed' });
  }
};

export const requireAdmin = (req, res, next) =>
  req.isAdmin ? next() : res.status(403).json({ message: 'Admin only' });