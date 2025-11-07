export type Txn = { id: string; type: "credit" | "debit"; amount: number; note: string; createdAt: string };

let data: Txn[] = [
    { id: "t1", type: "credit", amount: 500, note: "Signup bonus", createdAt: "2025-10-10T10:00:00Z" },
    { id: "t2", type: "debit", amount: 120, note: "Purchase: headset", createdAt: "2025-10-11T09:15:00Z" },
    { id: "t3", type: "credit", amount: 200, note: "Referral reward", createdAt: "2025-10-12T12:30:00Z" },
];

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));
const jitter = () => 250 + Math.random() * 750;

export async function listTransactions(signal?: AbortSignal): Promise<Txn[]> {
    await sleep(jitter());
    if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
    if (Math.random() < 0.15) throw new Error("Temporary server error"); // 15% flaky failure
    return [...data].sort((a, b) => b.createdAt.localeCompare(a.createdAt)); // newest first
}

export async function addTransaction(
    input: Omit<Txn, "id" | "createdAt">
): Promise<Txn> {
    await sleep(jitter());
    if (Math.random() < 0.25) throw new Error("Failed to add transaction"); // 25% fail to test rollback
    const txn: Txn = {
        ...input, id: crypto.randomUUID(), createdAt: new
            Date().toISOString()
    };
    data.unshift(txn);
    return txn;
}

export async function deleteTransaction(id: string): Promise<{ ok: true }> {
    await sleep(jitter());
    if (Math.random() < 0.15) throw new Error("Failed to delete");
    data = data.filter(d => d.id !== id);
    return { ok: true };
}