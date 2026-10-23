# Q1. 서울 vs 제주 1~2월 기온 비교 (겨울 훈련지로 제주가 타당한가?)
# 데이터: 기상자료개방포털(data.kma.go.kr) > 기후통계분석 > 기온분석
#   - 지점: 서울(108), 제주(184) / 기간: 최근 10년, 일 단위 -> CSV 저장
#   - weather_seoul.csv, weather_jeju.csv
import pandas as pd
import matplotlib.pyplot as plt

plt.rc("font", family="Malgun Gothic")  # Mac: "AppleGothic"
plt.rc("axes", unicode_minus=False)

def load(path, name):
    df = pd.read_csv(path, encoding="cp949", skiprows=7)  # 포털 CSV 머리말 줄 건너뛰기
    df.columns = ["날짜", "지점", "평균기온", "최저기온", "최고기온"]
    df["날짜"] = pd.to_datetime(df["날짜"].str.strip())
    df["도시"] = name
    return df[df["날짜"].dt.month.isin([1, 2])]

df = pd.concat([load("weather_seoul.csv", "서울"), load("weather_jeju.csv", "제주")])

# 1) 평균/최저/최고 기온 비교
summary = df.groupby("도시")[["평균기온", "최저기온", "최고기온"]].mean().round(1)
# 2) 영하(최저기온 < 0)인 날의 비율 = 야외 훈련이 어려운 날
summary["영하일 비율(%)"] = df.groupby("도시")["최저기온"].apply(lambda s: (s < 0).mean() * 100).round(1)
# 3) 최고기온 10도 이상인 날 비율 = 훈련하기 좋은 날
summary["10도 이상일 비율(%)"] = df.groupby("도시")["최고기온"].apply(lambda s: (s >= 10).mean() * 100).round(1)
print(summary)

# 그래프: 연도별 1~2월 평균기온
yearly = df.groupby([df["날짜"].dt.year, "도시"])["평균기온"].mean().unstack()
yearly.plot(marker="o", title="연도별 1~2월 평균기온 (서울 vs 제주)")
plt.ylabel("기온(℃)"); plt.xlabel("연도"); plt.grid(alpha=.3)
plt.savefig("q1_temp.png", dpi=150)

# 그래프: 기온 분포 (상자그림)
df.boxplot(column="평균기온", by="도시"); plt.suptitle("")
plt.title("1~2월 일평균기온 분포"); plt.savefig("q1_box.png", dpi=150)
plt.show()

diff = summary.loc["제주", "평균기온"] - summary.loc["서울", "평균기온"]
print(f"\n결론: 제주는 서울보다 1~2월 평균 {diff:.1f}℃ 따뜻하고, 영하일이 훨씬 적어 "
      "부상 위험이 낮고 야외 훈련 가능 일수가 많다 -> 제주 훈련은 타당하다.")
