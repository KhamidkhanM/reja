# Q2. 지도에 울산·창원·포항 남녀 인구 표시
# Q3. 울산·김해·창원·포항 중 여자 > 남자 인 지역 찾기
# 데이터: 행정안전부 주민등록 인구통계(jumin.mois.go.kr) > 주민등록 인구 및 세대현황
#   - 2026년 8월, 시군구 단위, 남녀 구분 -> population_202608.csv
#   - 컬럼 예: 행정구역, 총인구수, 남자인구수, 여자인구수
import pandas as pd
import folium
import matplotlib.pyplot as plt

plt.rc("font", family="Malgun Gothic")
plt.rc("axes", unicode_minus=False)

raw = pd.read_csv("population_202608.csv", encoding="cp949", thousands=",")
raw["행정구역"] = raw["행정구역"].str.replace(r"\s*\(\d+\)", "", regex=True).str.strip()

cities = {  # 도시 이름: 위도, 경도
    "울산광역시": (35.5384, 129.3114),
    "경상남도 창원시": (35.2280, 128.6811),
    "경상북도 포항시": (36.0190, 129.3435),
    "경상남도 김해시": (35.2285, 128.8894),
}
df = raw[raw["행정구역"].isin(cities)].copy()
df = df.rename(columns={"남자인구수": "남자", "여자인구수": "여자"}).set_index("행정구역")
df["도시"] = df.index.str.split().str[-1]
print(df[["도시", "남자", "여자"]])

# ---------- Q2: 지도 ----------
m = folium.Map(location=[35.6, 129.0], zoom_start=9)
for name in ["울산광역시", "경상남도 창원시", "경상북도 포항시"]:
    r = df.loc[name]
    lat, lon = cities[name]
    folium.Marker(
        [lat, lon],
        popup=f"<b>{r['도시']}</b><br>남자: {r['남자']:,}명<br>여자: {r['여자']:,}명",
        tooltip=f"{r['도시']} 남 {r['남자']:,} / 여 {r['여자']:,}",
    ).add_to(m)
    # 인구 크기에 비례한 원 (파랑=남, 빨강=여)
    folium.CircleMarker([lat, lon - 0.03], radius=r["남자"] / 30000, color="blue", fill=True).add_to(m)
    folium.CircleMarker([lat, lon + 0.03], radius=r["여자"] / 30000, color="red", fill=True).add_to(m)
m.save("q2_map.html")  # 브라우저로 열기

# ---------- Q3: 여자 > 남자 ----------
df["차이(여-남)"] = df["여자"] - df["남자"]
df["성비(남/여*100)"] = (df["남자"] / df["여자"] * 100).round(1)

# 방법 1: 조건 필터링 (가장 간단)
result = df[df["여자"] > df["남자"]]
print("\n[방법1] 여자 인구가 더 많은 지역:", list(result["도시"]) or "없음")

# 방법 2: 표 (성비 100 미만이면 여초)
print("\n[방법2]\n", df[["도시", "남자", "여자", "차이(여-남)", "성비(남/여*100)"]])

# 방법 3: 막대그래프 (남녀 나란히)
df.set_index("도시")[["남자", "여자"]].plot.bar(color=["steelblue", "salmon"], rot=0,
                                              title="2026년 8월 남녀 인구")
plt.ylabel("인구(명)"); plt.savefig("q3_bar.png", dpi=150)

# 방법 4: 차이 그래프 (0보다 크면 여초, 빨간색)
d = df.set_index("도시")["차이(여-남)"]
d.plot.barh(color=["red" if v > 0 else "blue" for v in d], title="여자 - 남자 인구 차이")
plt.axvline(0, color="k"); plt.savefig("q3_diff.png", dpi=150)
plt.show()

# 방법 5: 지도에 여초 지역만 빨간색으로 표시
m3 = folium.Map(location=[35.6, 129.0], zoom_start=9)
for name, (lat, lon) in cities.items():
    r = df.loc[name]
    folium.Marker([lat, lon], tooltip=f"{r['도시']} 여-남 {r['차이(여-남)']:+,}",
                  icon=folium.Icon(color="red" if r["차이(여-남)"] > 0 else "blue")).add_to(m3)
m3.save("q3_map.html")
