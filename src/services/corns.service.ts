import axios from "axios";

// interfaces
import {
  type PurchaseRecord,
  type cornPurchasePayload,
} from "@/services/interfaces/corns.interface";

// environment variables
const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/corns`;

/**
 * Fetches the purchase history for corns.
 */
export const getcornPurchaseHistory = async (): Promise<PurchaseRecord[]> => {
  try {
    const response = await axios.get<PurchaseRecord[]>(
      `${API_BASE_URL}/purchases`
    );
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching corn purchase history:", error);
    throw error;
  }
};

/**
 * Sends a request to purchase corns.
 * @param purchaseData - The data required for the purchase.
 * @returns The newly created purchase record (adjust based on API response).
 */
export const purchasecorn = async (
  purchaseData: cornPurchasePayload
): Promise<PurchaseRecord> => {
  try {
    const response = await axios.post<PurchaseRecord>(
      `${API_BASE_URL}/purchase`,
      purchaseData
    );
    return response.data;
  } catch (error) {
    console.error("Error purchasing corn:", error);
    throw error;
  }
};

export const cornService = {
  getPurchaseHistory: getcornPurchaseHistory,
  purchasecorn: purchasecorn,
};
