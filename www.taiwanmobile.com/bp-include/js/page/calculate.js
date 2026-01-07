/*
 * --------------------------------------------------------------------------
 * Taiwan Mobile Product: Plans Calculate (v20171012.1)
 * --------------------------------------------------------------------------
 */
/* global $ _ Vue */
(function (window, $) {
  $(document).ready(function () {
    var questionComponent = {
      props: ['question'],
      template: '\n        <transition name="caculate-fade-up">\n          <div class="calculate-box" v-if="question">\n            <h3 class="headline-calculate-question"><span class="text-brand-orange">Q{{ qNumber }}.</span> {{ question.title }}</h3>\n  \n            <div class="row calculate-answers">\n              <div class="calculate-answer col-12 col-sm" :class="{\'active\': answer.active}" v-for="answer in question.answers" :data-nextq="answer.nextq">\n                <a href="#" @click.prevent="chooseAnswer(answer.level, answer)">\n                  <div class="calculate-answer-inner">\n                    <div class="calculate-answer-content" v-html="answer.content"></div>\n                  </div>\n                </a>\n              </div>\n            </div>\n          </div>\n        </transition>\n      ',
      computed: {
        qNumber: function qNumber() {
          return this.question.level + 1;
        }
      },
      methods: {
        setActive: function setActive(answerTarget) {
          this.question.answers.forEach(function (answer) {
            answer.active = false;
            if (answer === answerTarget) {
              answer.active = true;
            }
          });
        },
        chooseAnswer: function chooseAnswer(level, answer) {
          this.setActive(answer);
          this.$emit('nextquestion', level + 1, answer);
        }
      }
    };
    var resultComponent = {
      props: ['resultdata'],
      template: '\n        <transition name="caculate-fade-up">\n          <div class="calculate-box-result" v-if="resultdata">\n            <p class="calculate-box-eyebrow">\u6839\u64DA\u60A8\u7684\u9078\u64C7\u5206\u6790\uFF0C\u6211\u5011\u8A8D\u70BA\u60A8\u9069\u5408\u4EE5\u4E0B\u901A\u8A71\u8CC7\u8CBB\uFF1A</p>\n            <div class="calculate-box-result-box">\n              <h4 class="headline-calculate-result">{{ resultdata.title }}</h4>\n              <div class="calculate-box-result-content" v-html="resultdata.content">\n              </div>\n              <div class="calculate-box-buttons text-center">\n                <a :href="resultdata.apply" class="btn btn-brand-orange btn-capsule">\u7533\u8FA6 / \u7570\u52D5</a>\n                <a href="calculate-3G-internet.html" class="btn btn-brand-gr btn-capsule">\u6E2C\u8A66\u4E0A\u7DB2\u8CC7\u8CBB</a>\n              </div>\n            </div>\n            <p class="calculate-box-note">*\u8CC7\u8CBB\u5C0F\u6E2C\u8A66\u7D50\u679C\u50C5\u4F9B\u53C3\u8003\u3002\u7528\u6236\u4F7F\u7528\u624B\u6A5F\u884C\u70BA\u8B8A\u66F4\u6642\uFF0C\u9069\u7528\u7684\u8CC7\u8CBB\u65B9\u6848\u4E5F\u53EF\u80FD\u6703\u6709\u6240\u6539\u8B8A\u3002</p>\n          </div>\n        </transition>\n      '
    };

    var calculateApp = new Vue({
      el: '#calculateApp',
      components: {
        resultComponent: resultComponent,
        questionComponent: questionComponent
      },
      data: {
        question: null,
        level: [{
          question: {
            id: null,
            title: null,
            answers: []
          }
        }, {
          question: {
            id: null,
            title: null,
            answers: []
          }
        }, {
          question: {
            id: null,
            title: null,
            answers: []
          }
        }, {
          question: {
            id: null,
            title: null,
            answers: []
          }
        }, {
          question: {
            id: null,
            title: null,
            answers: []
          }
        }],
        question1: null,
        question2: null,
        question3: null,
        question4: null,
        question5: null,
        result: false,
        resultData: null
      },
      computed: {
        cquestion1: function cquestion1() {
          var question = {
            id: this.question.id,
            title: this.question.title,
            level: this.question.level,
            answers: this.question.answers
          };
          return question;
        }
      },
      created: function created() {
        var _this = this;
        var questionPath = $('#calculateApp').data('questionPath');
        var resultPath = $('#calculateApp').data('resultPath');
        // console.log(questionPath)
        $.ajax({
          method: 'GET',
          url: questionPath,
          dataType: 'html',
          success: function success(data, textStatus) {
            var qdata = JSON.parse(data);
            _this.question = qdata.question;
          },
          error: function error(jqXHR, textStatus, errorThrown) {
            console.log('ajax is error!');
          }
        });
        $.ajax({
          method: 'GET',
          url: resultPath,
          dataType: 'html',
          success: function success(data, textStatus) {
            var qdata = JSON.parse(data);
            _this.result = qdata.result;
          },
          error: function error(jqXHR, textStatus, errorThrown) {
            console.log('ajax is error!');
          }
        });
      },

      methods: {
        generateQuestion: function generateQuestion(l, q) {
          if (l === 0) {
            console.log(q.title);
          }
        },
        generateResult: function generateResult(answer) {
          var ansResult = answer.result;
          /*
            MSIE is not work with Array.prototype.find,
            so rewrite find method with lodash.
          */
          // let result = this.result.find((r) => {
          //   if (r.id === ansResult) {
          //     return true
          //   }
          // })
          var result = _.find(this.result, function (r) {
            if (r.id === ansResult) {
              return true;
            }
          });
          this.resultData = result;
        },
        nextQuestionHandler: function nextQuestionHandler(level, answer) {
          var _this2 = this;

          var offsetY = $(window).width() >= 768 ? -78 : -46;
          if (answer.isResult === true) {
            this.generateResult(answer);
            setTimeout(function () {
              $('body').scrollTo(_this2.$refs['result'].$el, 800, { offset: offsetY });
            }, 300);
          } else {
            switch (level) {
              case 1:
                this.resultData = null;
                this.question2 = null;
                this.question3 = null;
                this.question4 = null;
                this.question5 = null;
                this.question1 = answer.question;
                break;
              case 2:
                this.question3 = null;
                this.question4 = null;
                this.question5 = null;
                this.resultData = null;
                this.question2 = answer.question;
                break;
              case 3:
                this.question4 = null;
                this.question5 = null;
                this.resultData = null;
                this.question3 = answer.question;
                break;
              case 4:
                this.question5 = null;
                this.resultData = null;
                this.question4 = answer.question;
                break;
              default:
                break;
            }
            setTimeout(function () {
              $('body').scrollTo(_this2.$refs['level' + (level + 1)].$el, 800, { offset: -78 });
            }, 300);
          }
        }
      }
    });
  });
})(window, $);