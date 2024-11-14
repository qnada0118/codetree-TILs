// 입력을 처리하기 위한 fs 모듈
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// 첫 번째 줄에서 N (정점 수)와 M (간선 수)을 파싱
const [N, M] = input[0].split(" ").map(Number);

// 그래프 초기화 (인접 리스트 방식)
const graph = Array.from({ length: N + 1 }, () => []);

// 간선 정보를 통해 그래프에 양방향 간선 추가
for (let i = 1; i <= M; i++) {
    const [x, y] = input[i].split(" ").map(Number);
    graph[x].push(y);
    graph[y].push(x);
}

// BFS를 사용하여 1번 정점에서 도달할 수 있는 정점을 탐색
function bfs(start) {
    const visited = Array(N + 1).fill(false);
    const queue = [start];
    visited[start] = true;
    let reachableCount = 0;

    while (queue.length > 0) {
        const node = queue.shift();

        for (const neighbor of graph[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.push(neighbor);
                reachableCount++;
            }
        }
    }
    return reachableCount;
}

// 1번 정점에서 도달할 수 있는 정점의 수 (1번 정점은 제외)
const result = bfs(1);
console.log(result);
