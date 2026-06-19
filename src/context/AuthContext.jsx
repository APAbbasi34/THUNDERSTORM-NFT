import { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../utils/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [inactivityTimer, setInactivityTimer] = useState(null);
  const INACTIVITY_TIMEOUT = 10 * 60 * 1000; // 10 minutes in milliseconds

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Fetch user profile from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data());
          } else {
            // Create initial user profile if it doesn't exist
            const initialProfile = {
              email: currentUser.email,
              createdAt: new Date().toISOString(),
              referralCode: generateReferralCode(),
              referredBy: null,
              points: 0,
              nftsOwned: [],
              achievements: [],
              isAdmin: false
            };
            await setDoc(doc(db, 'users', currentUser.uid), initialProfile);
            setUserProfile(initialProfile);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Auto-logout after inactivity
  useEffect(() => {
    if (!user) {
      // Clear timer if user is logged out
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
        setInactivityTimer(null);
      }
      return;
    }

    const resetTimer = () => {
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
      const timer = setTimeout(() => {
        logout();
      }, INACTIVITY_TIMEOUT);
      setInactivityTimer(timer);
    };

    // Initial timer setup
    resetTimer();

    // Track user activity
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    activityEvents.forEach(event => {
      window.addEventListener(event, resetTimer);
    });

    return () => {
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
      activityEvents.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [user, inactivityTimer]);

  const generateReferralCode = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const register = async (email, password, referralCode = null) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user profile with referral info
      const initialProfile = {
        email: email,
        createdAt: new Date().toISOString(),
        referralCode: generateReferralCode(),
        referredBy: referralCode || null,
        points: referralCode ? 100 : 0, // Bonus points for using referral code
        nftsOwned: [],
        achievements: [],
        isAdmin: false
      };
      
      await setDoc(doc(db, 'users', result.user.uid), initialProfile);
      setUserProfile(initialProfile);
      
      // If referral code was used, award points to referrer
      if (referralCode) {
        await awardReferralBonus(referralCode);
      }
      
      return result;
    } catch (error) {
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Check if user profile exists, create if not
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      if (!userDoc.exists()) {
        const initialProfile = {
          email: result.user.email,
          createdAt: new Date().toISOString(),
          referralCode: generateReferralCode(),
          referredBy: null,
          points: 0,
          nftsOwned: [],
          achievements: [],
          isAdmin: false
        };
        await setDoc(doc(db, 'users', result.user.uid), initialProfile);
        setUserProfile(initialProfile);
      }
      
      return result;
    } catch (error) {
      throw error;
    }
  };

  const awardReferralBonus = async (referralCode) => {
    try {
      // Find user with this referral code
      // Note: In production, you'd want to add a query index for this
      const usersRef = doc(db, 'users', referralCode); // Simplified - in production use query
      // This is a simplified version - in production you'd need to query by referralCode field
    } catch (error) {
      console.error('Error awarding referral bonus:', error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserProfile(null);
    } catch (error) {
      throw error;
    }
  };

  const sendPhoneOTP = async (phoneNumber, recaptchaVerifier) => {
    try {
      const result = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      setConfirmationResult(result);
      return { success: true };
    } catch (error) {
      throw error;
    }
  };

  const verifyPhoneOTP = async (otp) => {
    try {
      if (!confirmationResult) {
        throw new Error('No confirmation result available');
      }
      const result = await confirmationResult.confirm(otp);
      setConfirmationResult(null);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const sendEmailOTP = async (email) => {
    try {
      // For email OTP, we'll use Firebase's email verification
      // In production, you might want to use a custom email service
      const tempUser = await createUserWithEmailAndPassword(auth, email, Math.random().toString(36));
      await sendEmailVerification(tempUser.user);
      return { success: true, tempUser };
    } catch (error) {
      throw error;
    }
  };

  const verifyEmailOTP = async (otp) => {
    try {
      // In production, this would verify the OTP sent to email
      // For now, we'll simulate verification
      return { success: true };
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    login,
    register,
    loginWithGoogle,
    logout,
    sendPhoneOTP,
    verifyPhoneOTP,
    sendEmailOTP,
    verifyEmailOTP,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
