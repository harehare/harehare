// 他の必要なGitHub関連の機能は維持
export const fetchRepositoryData = async (owner, repo) => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`
    );
    const data = await response.json();

    // 増減計算ロジックを削除
    return {
      name: data.name,
      description: data.description,
      stars: data.stargazers_count,
    };
  } catch (error) {
    console.error("Error fetching repository data:", error);
    return null;
  }
};

// star数の増減を計算する関数があれば削除
// 例: calculateStarChange, updateStarHistory などの関数を削除
