---
title: CAN
author: 辉
cover: /images/4_1772525788432.png
date: 2026-03-16 14:42:09
tags:
---
``

```

```

# STM32 库函数 CAN 解读

### 初始化相关

**首先，初始化 CAN 控制器，配置指定 CAN 控制器（CANx）的初始化参数。CAN\_InitStruct 包含了 CAN 控制器的初始化配置：**

```css
uint8_t CAN_Init(CAN_TypeDef* CANx, CAN_InitTypeDef* CAN_InitStruct);
```

**初始化 CAN 滤波器，配置 CAN 滤波器。CAN\_FilterInitStruct 包含 CAN 滤波器的相关参数：**

```css
void CAN_FilterInit(CAN_FilterInitTypeDef* CAN_FilterInitStruct);ct);
```

---

** **  初始化 CAN 配置结构体， 将 CAN\_InitTypeDef 结构体中的所有成员初始化为默认值，用于后续 CAN 初始化：

```css
void CAN_StructInit(CAN_InitTypeDef* CAN_InitStruct);
```

**下面这三个函数我们这里用不到，大概意思分别是：		1. 启动 CAN 从设备的滤波器**

**                                                                                        2. 控制 CAN 调试冻结模式**

**                                                                                        3. 控制 CAN 时间触发通信模式**

```css
void CAN_SlaveStartBank(uint8_t CAN_BankNumber); //1
void CAN_DBGFreeze(CAN_TypeDef* CANx, FunctionalState NewState);//2
void CAN_TTComModeCmd(CAN_TypeDef* CANx, FunctionalState NewState);//3
```

### 发送相关

![](https://cdn.nlark.com/yuque/0/2026/png/61293543/1773639498904-8022c7aa-4991-4181-96c7-bff7d5d3dd4f.png)

**发送 CAN 消息， 将指定的 CAN 消息（TxMessage）通过指定的 CAN 控制器（CANx）进行传输。函数返回发送的状态：**

```css
uint8_t CAN_Transmit(CAN_TypeDef* CANx, CanTxMsg* TxMessage);
```

**获取 CAN 消息发送状态， 获取指定发送邮箱（TransmitMailbox）的消息传输状态。返回的状态可以用来确认消息是否已经成功发送或正在发送中：**

```css
uint8_t CAN_TransmitStatus(CAN_TypeDef* CANx, uint8_t TransmitMailbox);
```

**取消 CAN 消息发送， 取消通过指定的发送邮箱（Mailbox）发送的 CAN 消息。这通常用于停止消息的传输，尤其是在传输过程中遇到错误或不再需要该消息时：**

```css
void CAN_CancelTransmit(CAN_TypeDef* CANx, uint8_t Mailbox);
```

### 接收相关

![](https://cdn.nlark.com/yuque/0/2026/png/61293543/1773639578916-be68f1c5-bfc1-48a4-8704-cf760fa2a444.png)

** 	接收 CAN 消息，从指定的接收 FIFO（FIFONumber）中接收 CAN 消息，并将接收到的消息存储在 RxMessage 中。CANx 表示使用的 CAN 控制器：**

```css
void CAN_Receive(CAN_TypeDef* CANx, uint8_t FIFONumber, CanRxMsg* RxMessage);
```

**释放 CAN 接收 FIFO， 释放指定 FIFO（FIFONumber）中已处理的消息，允许该 FIFO 准备接收新的消息：**

```css
void CAN_FIFORelease(CAN_TypeDef* CANx, uint8_t FIFONumber);
```

---

**检查 CAN 接收 FIFO 是否有待处理的消息，检查指定 FIFO（FIFONumber）中是否有待处理的消息。如果有，函数返回消息的数量；如果没有，返回 0：**

```css
uint8_t CAN_MessagePending(CAN_TypeDef* CANx, uint8_t FIFONumber);
```

### 工作模式转换相关

![](https://cdn.nlark.com/yuque/0/2026/png/61293543/1773639658038-cc8c8caf-0b4d-44fe-b42b-3c947516886f.png)

**  请求 CAN 操作模式， 请求将 CAN 控制器切换到指定的操作模式（CAN\_OperatingMode）。例如，可以切换到正常模式、睡眠模式或初始化模式：**

```css
uint8_t CAN_OperatingModeRequest(CAN_TypeDef* CANx, uint8_t CAN_OperatingMode);
```

**       使 CAN 进入睡眠模式，将 CAN 控制器设置为睡眠模式，以减少功耗。通常用于低功耗应用**

```css
uint8_t CAN_Sleep(CAN_TypeDef* CANx);
```

**  	唤醒 CAN 控制器，从睡眠模式唤醒 CAN 控制器，使其恢复正常工作：**

```css
uint8_t CAN_WakeUp(CAN_TypeDef* CANx);
```

### 错误管理相关

![](https://cdn.nlark.com/yuque/0/2026/png/61293543/1773639723622-659742df-5a78-405e-8b8c-44368c6a281c.png)

**获取 CAN 控制器的最后错误代码，获取 CAN 控制器上一次发生的错误代码。返回的错误码可以用于诊断故障：**

```css
uint8_t CAN_GetLastErrorCode(CAN_TypeDef* CANx);
```

---

**获取接收错误计数器，返回 CAN 接收过程中的错误计数。该计数器指示接收到的错误帧的数量：**

```css
uint8_t CAN_GetReceiveErrorCounter(CAN_TypeDef* CANx);
```

** 获取 LSB 发送错误计数器，返回 CAN 发送过程中的错误计数，特别是低位字节（LSB）部分的发送错误计数：**

```css
uint8_t CAN_GetLSBTransmitErrorCounter(CAN_TypeDef* CANx);
```

**中断相关**

**        配置 CAN 中断，启用或禁用指定的 CAN 中断（CAN\_IT）。NewState 参数决定是否使能中断：**

```css
void CAN_ITConfig(CAN_TypeDef* CANx, uint32_t CAN_IT, FunctionalState NewState);
```

**        获取 CAN 标志状态，返回指定 CAN 标志（CAN\_FLAG）的状态，指示该标志是否已被设置：**

```css
FlagStatus CAN_GetFlagStatus(CAN_TypeDef* CANx, uint32_t CAN_FLAG);
```

**        清除 CAN 标志，清除指定的 CAN 标志（CAN\_FLAG）。该操作通常在处理中断或完成某个任务后执行：**

```css
void CAN_ClearFlag(CAN_TypeDef* CANx, uint32_t CAN_FLAG);
```

**        获取 CAN 中断状态，返回指定 CAN 中断（CAN\_IT）的状态，指示该中断是否已被触发：**

```css
ITStatus CAN_GetITStatus(CAN_TypeDef* CANx, uint32_t CAN_IT);
```

**        清除 CAN 中断挂起标志，清除指定的 CAN 中断挂起标志，通常用于处理中断后，重置中断标志以便下次触发**

```css
void CAN_ClearITPendingBit(CAN_TypeDef* CANx, uint32_t CAN_IT)
```

# 代码编写

#### 回环测试代码

##### GPIO 口初始化

**根据数据手册我们可以了解到在 STM32 上，CAN 的引脚有两对，首先是 PA11 和 PA12 引脚：**

![](https://cdn.nlark.com/yuque/0/2026/png/61293543/1773640259010-2dbb4c0b-881f-4b6c-acc9-5f2b5dfb3431.png)

**配置就是正常引脚配置，不过这里要注意开启 CAN1 的时钟：**

**第一步就要使能 CAN 的时钟。**

```css
RCC_APB1PeriphClockCmd(RCC_APB1Periph_CAN1, ENABLE);//使能 CAN1 时钟
```

**其次要设置 CAN 的相关引脚为复用输出，这里我们需要设置**

** PA11 为上拉输入（CAN\_RX 引脚） **

**PA12 为复用输出（CAN\_TX 引脚）**

**并使能 PA 口的时钟。 **

```css
void CAN_GPIO_Config(void)
{
  RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE);
  RCC_APB1PeriphClockCmd(RCC_APB1Periph_CAN1, ENABLE);

  GPIO_InitTypeDef GPIO_InitStructure;
  GPIO_InitStructure.GPIO_Mode = GPIO_Mode_AF_PP;//复用推挽输出
  GPIO_InitStructure.GPIO_Pin = GPIO_Pin_12;
  GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
  GPIO_Init(GPIOA, &GPIO_InitStructure);

  GPIO_InitStructure.GPIO_Mode = GPIO_Mode_IPU;//上拉输入
  GPIO_InitStructure.GPIO_Pin = GPIO_Pin_11;
  GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
  GPIO_Init(GPIOA, &GPIO_InitStructure);
}
```

**如果需要 CAN 重映射**

![](https://cdn.nlark.com/yuque/0/2026/png/61293543/1773640544083-0d6fbc1d-b896-4549-b759-17cdfc0d3763.png)

```css
void CAN_GPIO_Config(void)
{
  GPIO_InitTypeDef GPIO_InitStructure;
  RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOB, ENABLE);
  RCC_APB2PeriphClockCmd(RCC_APB2Periph_AFIO, ENABLE);
  RCC_APB1PeriphClockCmd(RCC_APB1Periph_CAN1, ENABLE);//使能CAN1

  //重映射引脚，端口映射
  GPIO_PinRemapConfig(GPIO_Remap1_CAN1, ENABLE);

  //CAN_RX
  GPIO_InitStructure.GPIO_Mode = GPIO_Mode_IPU;//上拉输入
  GPIO_InitStructure.GPIO_Pin = GPIO_Pin_8;
  GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
  GPIO_Init(GPIOB, &GPIO_InitStructure);

  //CAN_TX
  GPIO_InitStructure.GPIO_Mode = GPIO_Mode_AF_PP;//复用推挽输出
  GPIO_InitStructure.GPIO_Pin = GPIO_Pin_9;
  GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
  GPIO_Init(GPIOB, &GPIO_InitStructure);
```

**}**

##### 模式配置

**这里主要对 CAN 控制器，进行一个初始化操作，其中 CAN\_InitTypeDef 所包含的内容，可以再 stm32f10x\_can.h 中找到：**

```css
typedef struct
{
  uint16_t CAN_Prescaler;   /*!< 指定时间量子的长度。
                                 该值的范围是从 1 到 1024。 */
 
  uint8_t CAN_Mode;         /*!< 指定CAN操作模式。
                                 该参数可以是以下枚举值之一：@ref CAN_operating_mode */
 
  uint8_t CAN_SJW;          /*!< 指定CAN硬件允许用来进行重新同步的最大时间量子数。
                                 该值可以是以下枚举值之一：@ref CAN_synchronisation_jump_width */
 
  uint8_t CAN_BS1;          /*!< 指定位段1中的时间量子数。
                                 该参数可以是以下枚举值之一：@ref CAN_time_quantum_in_bit_segment_1 */
 
  uint8_t CAN_BS2;          /*!< 指定位段2中的时间量子数。
                                 该参数可以是以下枚举值之一：@ref CAN_time_quantum_in_bit_segment_2 */
  
  FunctionalState CAN_TTCM; /*!< 启用或禁用时间触发通信模式。此参数可以设置为 ENABLE 或 DISABLE。 */
  
  FunctionalState CAN_ABOM;  /*!< 启用或禁用自动总线关闭管理模式。此参数可以设置为 ENABLE 或 DISABLE。 */
 
  FunctionalState CAN_AWUM;  /*!< 启用或禁用自动唤醒模式。此参数可以设置为 ENABLE 或 DISABLE。 */
 
  FunctionalState CAN_NART;  /*!< 启用或禁用无自动重传模式。此参数可以设置为 ENABLE 或 DISABLE。 */
 
  FunctionalState CAN_RFLM;  /*!< 启用或禁用接收FIFO锁定模式。此参数可以设置为 ENABLE 或 DISABLE。 */
 
  FunctionalState CAN_TXFP;  /*!< 启用或禁用发送FIFO优先级模式。此参数可以设置为 ENABLE 或 DISABLE。 */
} CAN_InitTypeDef;
```

**对于 uint8\_t CAN\_Mode; 其代表的是，以下模式：**

![](https://cdn.nlark.com/yuque/0/2026/png/61293543/1773640823579-4f6bddad-4d4a-48d0-b9a5-ac299ffa90fa.png)

![](https://cdn.nlark.com/yuque/0/2026/png/61293543/1773640832379-03db3d95-df79-41bd-afef-1c4fd1ea7c03.png)

**这里我们使用的是环回模式进行代码测试，因此需要选择 CAN\_Mode\_LoopBack ：**

```css
CAN_InitStructure.CAN_Mode = CAN_Mode_LoopBack;
```

**  波特率相关对应的是：**

![](https://cdn.nlark.com/yuque/0/2026/png/61293543/1773640880191-d28bcb1c-e613-418e-9e39-c94b6d054c48.png)

**上图公式可写为：**

**波特率 = APB1 时钟频率 / 分频系数 / 一位的 Tq 数量                **

**= 36MHz / (BRP[9:0]+1) / (1 + (TS1[3:0]+1) + (TS2[2:0]+1))**

**详解可以参考 **[https://blog.csdn.net/MANONGDKY/article/details/143591804](https://blog.csdn.net/MANONGDKY/article/details/143591804)

**对于 BS1 和 BS2 这里又一个加一的操作，那么我们在代码声明时需不需要进行减一的操作来陪着这里呢？实际上是不需要的，因为 STM32 的库函数已经帮我们把这一步封装过了我们只需要进行直接带入即可：**

**波特率 = APB1 时钟频率 / 分频系数 / 一位的 Tq 数量                **

**= 36MHz / Prescaler/ (1 + PBS1 + PBS2)**

**这里需要注意对于 PBS1，PBS2 和 SJW 这三个值是有取值范围的，其中 PBS1 取值范围是 1\~16Tq：**

```css
#define CAN_BS1_1tq                 ((uint8_t)0x00)  /*!< 1 time quantum */
#define CAN_BS1_2tq                 ((uint8_t)0x01)  /*!< 2 time quantum */
#define CAN_BS1_3tq                 ((uint8_t)0x02)  /*!< 3 time quantum */
#define CAN_BS1_4tq                 ((uint8_t)0x03)  /*!< 4 time quantum */
#define CAN_BS1_5tq                 ((uint8_t)0x04)  /*!< 5 time quantum */
#define CAN_BS1_6tq                 ((uint8_t)0x05)  /*!< 6 time quantum */
#define CAN_BS1_7tq                 ((uint8_t)0x06)  /*!< 7 time quantum */
#define CAN_BS1_8tq                 ((uint8_t)0x07)  /*!< 8 time quantum */
#define CAN_BS1_9tq                 ((uint8_t)0x08)  /*!< 9 time quantum */
#define CAN_BS1_10tq                ((uint8_t)0x09)  /*!< 10 time quantum */
#define CAN_BS1_11tq                ((uint8_t)0x0A)  /*!< 11 time quantum */
#define CAN_BS1_12tq                ((uint8_t)0x0B)  /*!< 12 time quantum */
#define CAN_BS1_13tq                ((uint8_t)0x0C)  /*!< 13 time quantum */
#define CAN_BS1_14tq                ((uint8_t)0x0D)  /*!< 14 time quantum */
#define CAN_BS1_15tq                ((uint8_t)0x0E)  /*!< 15 time quantum */
#define CAN_BS1_16tq                ((uint8_t)0x0F)  /*!< 16 time quantum */
 
#define IS_CAN_BS1(BS1) ((BS1) <= CAN_BS1_16tq)
```

**   PBS2 取值范围是 1\~8Tq：**

```css
#define CAN_BS2_1tq                 ((uint8_t)0x00)  /*!< 1 time quantum */
#define CAN_BS2_2tq                 ((uint8_t)0x01)  /*!< 2 time quantum */
#define CAN_BS2_3tq                 ((uint8_t)0x02)  /*!< 3 time quantum */
#define CAN_BS2_4tq                 ((uint8_t)0x03)  /*!< 4 time quantum */
#define CAN_BS2_5tq                 ((uint8_t)0x04)  /*!< 5 time quantum */
#define CAN_BS2_6tq                 ((uint8_t)0x05)  /*!< 6 time quantum */
#define CAN_BS2_7tq                 ((uint8_t)0x06)  /*!< 7 time quantum */
#define CAN_BS2_8tq                 ((uint8_t)0x07)  /*!< 8 time quantum */
```

**SJW 取值范围是 1\~4Tq：**

```css
#define CAN_SJW_1tq                 ((uint8_t)0x00)  /*!< 1 time quantum */
#define CAN_SJW_2tq                 ((uint8_t)0x01)  /*!< 2 time quantum */
#define CAN_SJW_3tq                 ((uint8_t)0x02)  /*!< 3 time quantum */
#define CAN_SJW_4tq                 ((uint8_t)0x03)  /*!< 4 time quantum */

#define IS_CAN_SJW(SJW) (((SJW) == CAN_SJW_1tq) || ((SJW) == CAN_SJW_2tq)|| \
((SJW) == CAN_SJW_3tq) || ((SJW) == CAN_SJW_4tq))
```

**   对于剩下的参数：**

**TTCM：置 1，开启时间触发通信功能；置 0，关闭时间触发通信功能。CAN 外设内置一个 16 位的计数器，用于记录时间戳，TTCM 置 1 后，该计数器在每个 CAN 位的时间自增一次，溢出后归零。**

**ABOM：置 1，开启离线自动恢复，进入离线状态后，就自动开启恢复过程；置 0，关闭离线自动恢复，软件必须先请求进入然后再退出初始化模式，随后恢复过程才被开启。**

**AWUM：置 1，自动唤醒，一旦检测到 CAN 总线活动，硬件就自动清零 SLEEP，唤醒 CAN 外设；置 0，手动唤醒，软件清零 SLEEP，唤醒 CAN 外设。**

**NART：置 1，关闭自动重传，CAN 报文只被发送 1 次，不管发送的结果如何（成功、出错或仲裁丢失）；置 0，自动重传，CAN 硬件在发送报文失败时会一直自动重传直到发送成功。**

**        该函数询问是否关闭自动重传，因为 STM32 默认自动重传，我们不想关闭，因此置 0。**

**RFLM：置 1，接收 FIFO 锁定，FIFO 溢出时，新收到的报文会被丢弃；置 0，禁用 FIFO 锁定，FIFO 溢出时，FIFO 中最后收到的报文被新报文覆盖。**

**        根据自己需求，这里也置 0 了。**

**TXFP：置 1，优先级由发送请求的顺序来决定，先请求的先发送；置 0，优先级由报文标识符来决定，标识符值（ID 号）小的先发送（标识符值相等时，邮箱号小的报文先发送）。**

**        根据需求，这里我们选择 ID 号小的先发送，因此置 0。 **

**下面是完整的模式配置初始化代码：**

```css
void CAN_Mode_Config(void)
{
	CAN_InitTypeDef CAN_InitStructure;
 
	CAN_DeInit(CAN1);
	CAN_StructInit(&CAN_InitStructure);
 
	CAN_InitStructure.CAN_TTCM=DISABLE;			 //MCR-TTCM  关闭时间触发通信模式使能  ENABLE
	CAN_InitStructure.CAN_ABOM=DISABLE;			 //MCR-ABOM  关闭自动离线管理   
	CAN_InitStructure.CAN_AWUM=DISABLE;			 //MCR-AWUM  关闭自动唤醒模式  
	CAN_InitStructure.CAN_NART=DISABLE;			 //MCR-NART  禁止报文自动重传   
	CAN_InitStructure.CAN_RFLM=DISABLE;			 //MCR-RFLM  接收FIFO锁定模式    DISABLE  溢出时新报文会覆盖原有报文
	CAN_InitStructure.CAN_TXFP=DISABLE;			 //MCR-TXFP  发送FIFO优先级      DISABLE  优先级取决于报文标识符ID
	CAN_InitStructure.CAN_Mode = CAN_Mode_LoopBack;  //CAN_Mode_LoopBack  回环工作模式     CAN_Mode_Normal   正常工作模式
 
	//波特率相关
    //ss1=1 bs1=9 bs2=8 位时间宽度为(1+9+8) 波特率即为时钟周期tq*(1+9+8)
	//采样点位于PBS1和PBS2之间
	CAN_InitStructure.CAN_SJW=CAN_SJW_1tq;	 //BTR-SJW  重新同步跳跃宽度 1个时间单元  
	CAN_InitStructure.CAN_BS1=CAN_BS1_9tq;	 //BTR-TS1  时间段1  占用9个时间单元  
	CAN_InitStructure.CAN_BS2=CAN_BS2_8tq;	 //BTR-TS2  时间段2  占用8个时间单元
	//(CAN时钟频率APB1 = 36 MHz)
	CAN_InitStructure.CAN_Prescaler =4;		   //BTR-BRP  波特率分频器  定义了时间单元的时间长度 36000/[(1+9+8)*4]=500Kbps
 
    CAN_Init(CAN1, &CAN_InitStructure);  
}
```

##### 过滤器配置

**这里主要对 CAN 过滤器，进行一个初始化操作，其中 CAN\_FilterInitTypeDef 所包含的内容，可以再 stm32f10x\_can.h 中找到：**

```css
typedef struct
{
  uint16_t CAN_FilterIdHigh;         /*!< 指定过滤器标识符的高16位（对于32位配置中的高16位，16位配置中的第一个标识符）。
                                           该参数的值范围是 0x0000 到 0xFFFF。 */
 
  uint16_t CAN_FilterIdLow;          /*!< 指定过滤器标识符的低16位（对于32位配置中的低16位，16位配置中的第二个标识符）。
                                           该参数的值范围是 0x0000 到 0xFFFF。 */
 
  uint16_t CAN_FilterMaskIdHigh;     /*!< 指定过滤器掩码的高16位或标识符（根据模式，32位配置中的高16位，16位配置中的第一个掩码）。
                                           该参数的值范围是 0x0000 到 0xFFFF。 */
 
  uint16_t CAN_FilterMaskIdLow;      /*!< 指定过滤器掩码的低16位或标识符（根据模式，32位配置中的低16位，16位配置中的第二个掩码）。
                                           该参数的值范围是 0x0000 到 0xFFFF。 */
 
  uint16_t CAN_FilterFIFOAssignment; /*!< 指定将分配给过滤器的FIFO（0 或 1）。
                                           该参数的值可以是 @ref CAN_filter_FIFO 的一个值。 */
 
  uint8_t CAN_FilterNumber;          /*!< 指定将要初始化的过滤器。范围从 0 到 13。 */
 
  uint8_t CAN_FilterMode;            /*!< 指定要初始化的过滤器模式。
                                           该参数可以是 @ref CAN_filter_mode 中的一个值。 */
 
  uint8_t CAN_FilterScale;           /*!< 指定过滤器的规模（16位或32位）。
                                           该参数可以是 @ref CAN_filter_scale 中的一个值。 */
 
  FunctionalState CAN_FilterActivation; /*!< 启用或禁用过滤器。
                                             该参数可以设置为 ENABLE 或 DISABLE。 */
} CAN_FilterInitTypeDef;
```

![](https://cdn.nlark.com/yuque/0/2026/png/61293543/1773643029659-1dccd37e-abab-4d65-8e91-617da77be4bf.png)

**   下面这四个函数分别代表 R1 高 16 位和低 16 位，R2 高 16 位和低 16 位：**

```css
uint16_t CAN_FilterIdHigh;         /*!< 指定过滤器标识符的高16位（对于32位配置中的高16位，16位配置中的第一个标识符）。
                                           该参数的值范围是 0x0000 到 0xFFFF。 */
 
uint16_t CAN_FilterIdLow;          /*!< 指定过滤器标识符的低16位（对于32位配置中的低16位，16位配置中的第二个标识符）。
                                           该参数的值范围是 0x0000 到 0xFFFF。 */
 
uint16_t CAN_FilterMaskIdHigh;     /*!< 指定过滤器掩码的高16位或标识符（根据模式，32位配置中的高16位，16位配置中的第一个掩码）。
                                           该参数的值范围是 0x0000 到 0xFFFF。 */
 
uint16_t CAN_FilterMaskIdLow;      /*!< 指定过滤器掩码的低16位或标识符（根据模式，32位配置中的低16位，16位配置中的第二个掩码）。
                                           该参数的值范围是 0x0000 到 0xFFFF。 */
```

**对于模式的选择：**

```css
#define CAN_FilterMode_IdMask       ((uint8_t)0x00)  /*!< identifier/mask mode标识符屏蔽位模式 */
#define CAN_FilterMode_IdList       ((uint8_t)0x01)  /*!< identifier list mode列表模式 */
 
#define IS_CAN_FILTER_MODE(MODE) (((MODE) == CAN_FilterMode_IdMask) || \
                                  ((MODE) == CAN_FilterMode_IdList))
```

---

** 对于位宽：**

```css
#define CAN_FilterScale_16bit       ((uint8_t)0x00) /*!< Two 16-bit filters */
#define CAN_FilterScale_32bit       ((uint8_t)0x01) /*!< One 32-bit filter */
 
#define IS_CAN_FILTER_SCALE(SCALE) (((SCALE) == CAN_FilterScale_16bit) || \
                                    ((SCALE) == CAN_FilterScale_32bit))
```

**关联的过滤器选择：**

```css
#define CAN_Filter_FIFO0             ((uint8_t)0x00)  /*!< Filter FIFO 0 assignment for filter x */
#define CAN_Filter_FIFO1             ((uint8_t)0x01)  /*!< Filter FIFO 1 assignment for filter x */
#define IS_CAN_FILTER_FIFO(FIFO) (((FIFO) == CAN_FilterFIFO0) || \
                                  ((FIFO) == CAN_FilterFIFO1))
```

**     过滤器初始化完整的代码配置：**

```css
//CAN的过滤器配置
void CAN_Filter_Config(void)
{
	CAN_FilterInitTypeDef  CAN_FilterInitStructure;
 
	CAN_FilterInitStructure.CAN_FilterNumber=0;//过滤器组0
	CAN_FilterInitStructure.CAN_FilterMode=CAN_FilterMode_IdMask;//	标识符屏蔽位模式     IdList 标识符列表模式 
	CAN_FilterInitStructure.CAN_FilterScale=CAN_FilterScale_32bit;//过滤器位宽为单个32位
 
	CAN_FilterInitStructure.CAN_FilterIdHigh= 0;//要筛选的ID高位
	CAN_FilterInitStructure.CAN_FilterIdLow= 0;//要筛选的ID低位 
	CAN_FilterInitStructure.CAN_FilterMaskIdHigh= 0;
	CAN_FilterInitStructure.CAN_FilterMaskIdLow= 0;

 
	CAN_FilterInitStructure.CAN_FilterFIFOAssignment=CAN_Filter_FIFO0 ;//过滤器被关联到FIFO0
	CAN_FilterInitStructure.CAN_FilterActivation=ENABLE;//使能过滤器
	CAN_FilterInit(&CAN_FilterInitStructure);
 
}
```

##### 初始化整合

**对于以上 3 个小节就是完整的 CAN 初始化操作，只需要创建一个函数将三者整合：**

/d
