<template>
  <div id="content">
    <el-row class="head bk">
      <el-col :span="12">
        <div>今日学习 0节</div>
      </el-col>
      <el-col class="relative title" :span="12">今日经验 0</el-col>
    </el-row>

    <el-row :gutter="10" class="sizing distance">
      <el-col :span="12" class="relative">
        <div class="content bk">
          <el-row>
            <el-col :span="12">
              <div class="textRed textLeft">课表完成程度</div>
            </el-col>
          </el-row>
          <el-row class="sizing">
            <el-col class="radius" :span="6">已学0节</el-col>
            <el-col class="radius" :span="6">未学0节</el-col>
            <el-col class="radius" :span="12">
              <div ref="radius" class="radiusEcharts"></div>
            </el-col>
          </el-row>
        </div>
      </el-col>

      <el-col :span="12" class="relative">
        <div class="content">
          <el-row>
            <el-col :span="24">
              <div class="textRed textLeft">7日学习情况</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div ref="echarts" class="echarts"></div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>


    <div class="bk relative done">
      <span class="title textLeft textRed">已学</span>
    </div>
    <div class="bk relative do">
      <span class="title textLeft textRed">未学</span>
    </div>

    <div>

    </div>

  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "",
  data: function() {
    return {};
  },
  components: {},
  computed: {},
  mounted: function() {
    this.drawEcharts();
    this.drawRadius();
  },
  created: function() {},
  methods: {
    drawEcharts() {
      var myEcharts = echarts.init(this.$refs.echarts, "dart");
      var myDate = new Date();
      var month = myDate.getMonth() + 1;
      var date = myDate.getDate();
      // 近7天
      date -= 6;
      var arr = Array.from(new Array(7))
        .fill(0)
        .map(res => {
          return Array.of(month, date++).join("-");
        });

      var posList = [
        "left",
        "right",
        "top",
        "bottom",
        "inside",
        "insideTop",
        "insideLeft",
        "insideRight",
        "insideBottom",
        "insideTopLeft",
        "insideTopRight",
        "insideBottomLeft",
        "insideBottomRight"
      ];

      app.configParameters = {
        rotate: {
          min: -90,
          max: 90
        },
        align: {
          options: {
            left: "left",
            center: "center",
            right: "right"
          }
        },
        verticalAlign: {
          options: {
            top: "top",
            middle: "middle",
            bottom: "bottom"
          }
        },
        position: {
          options: echarts.util.reduce(
            posList,
            function(map, pos) {
              map[pos] = pos;
              return map;
            },
            {}
          )
        },
        distance: {
          min: 0,
          max: 100
        }
      };

      app.config = {
        rotate: 0,
        align: "center",
        verticalAlign: "middle",
        position: "top",
        distance: 5,
        onChange: function() {
          var labelOption = {
            normal: {
              rotate: app.config.rotate,
              align: app.config.align,
              verticalAlign: app.config.verticalAlign,
              position: app.config.position,
              distance: app.config.distance
            }
          };
          myChart.setOption({
            series: [
              {
                label: labelOption
              },
              {
                label: labelOption
              },
              {
                label: labelOption
              },
              {
                label: labelOption
              }
            ]
          });
        }
      };

      var labelOption = {
        show: true,
        position: app.config.position,
        distance: app.config.distance,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        rotate: app.config.rotate,
        formatter: "{c}",
        fontSize: 8,
        rich: {
          name: {
            textBorderColor: "#fff"
          }
        }
      };

      var option = {
        textStyle: {
          color: "#c0c4cc"
        },
        tooltip: {},
        xAxis: {
          data: [],
          name: "日期"
        },
        yAxis: {
          name: "课程/节"
        },
        series: [
          {
            label: labelOption,
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };
      option.xAxis.data = arr;
      myEcharts.setOption(option);
    },
    drawRadius() {
      var myEcharts = echarts.init(this.$refs.radius);
      var option = {
        // tooltip: {
        //   trigger: "item",
        //   formatter: "{a} <br/>{b}: {c} ({d}%)"
        // },
        title: {
          text: "完成度",
          x: "center",
          y2: "center",
          textStyle: {
            color: ["#c0c4cc"],
            fontSize: 12,
            fontWeight: "normal"
          }
        },
        legend: {
          textStyle: {
            fontSize: "12"
          },
          orient: "vertical",
          left: 2,
          data: ["123", "456"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["40%", "50%"],
            avoidLabelOverlap: false,
            // 悬浮不
            hoverAnimation: false,
            label: {
              normal: {
                show: false,
                position: "center"
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 0, name: "已学" },
              { value: 100, name: "未学" }
            ]
          }
        ]
      };

      myEcharts.setOption(option);
    }
  }
};
</script>

<style scoped>
#content {
}

.bk{
  background: #383838;
}

.head {
  height: 40px;
  line-height: 40px;
}

.content {
  margin: 10px 0px;
  box-sizing: border-box;
}

.title::before {
  content: "|";
  color: gray;
  position: absolute;
  left: 0px;
}

.relative {
  position: relative;
}

.distance {
  box-sizing: border-box;
}

.echarts {
  width: 100%;
  height: 200px;
  line-height: 200px;
}

.sizing {
  box-sizing: border-box;
}

.radius {
  height: 200px;
  line-height: 200px;
}

.el-col {
  text-align: center;
}

.radiusEcharts {
  height: 200px;
  line-height: 200px;
}

.textCenter {
  text-align: center;
}

.textLeft {
  text-align: left;
  padding-left: 15px;
}

.textRed::before {
  position: absolute;
  left: 5px;
  display: inline-block;
  border-left: 5px solid red;
  height: 20px;
  content: "";
}

.done{
  margin:10px 0;
  padding:10px 0;
  /* background: #6c7b8b; */
  background: #636363;
}


.do{
  margin:10px 0;
  padding:10px 0;
}
</style>