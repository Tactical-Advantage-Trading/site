+++
title = "Claim eCash"
layout = "claim-ecash"
menu_back_to_home = true
menu_section_title = "Key Wallet"
menu_section_target = "/key-wallet"
menu_section_back = true
menu_current_title = "Claim eCash"

[[claim_sections]]
title = "1. Claim your ECX balance"

  [[claim_sections.steps]]
  title = "Install Key Wallet"
  image = "images/1-1.png"
  image_alt = "Key Wallet welcome screen with options to create or restore a wallet"
  content = """Install Key Wallet from Play Store, or download the APK directly from the [GitHub releases page](https://github.com/Tactical-Advantage-Trading/wallet/releases).

**Caution:** Do not install an app from any other place except those two links above! Doing so will most likey result in loss of funds."""

  [[claim_sections.steps]]
  title = "Restore your balance"
  image = "images/1-2.png"
  image_alt = "Key Wallet dialog for entering a 12-word recovery phrase"
  content = """To restore both ECX and BTC balances, you need a 12-word BIP39 recovery phrase. Choose **Restore existing wallet**, then enter your recovery words in order.

**Caution:** Never enter the phrase shown in this screenshot. It is just a disposable example."""

  [[claim_sections.steps]]
  title = "Observe ECX and BTC balances"
  image = "images/1-3.png"
  image_alt = "Key Wallet showing three ECX wallet types and one BTC wallet"
  content = """Once confirmed, Key Wallet derives three ECX wallet types: BIP84 (labeled as eCash), BIP44, and BIP32, along with BTC BIP84 wallet (labeled as Bitcoin). 

  It shows several wallet standards for ECX at once because Bitcoin wallets have used all these standards over the years, so user funds may be scattered across them.

  In this example, user does have BTC balances scattered across different wallet standards, so they are reflected as 1:1 balances on respected EXC cards.

In this example, ECX BIP84 and BTC BIP84 balances match because they represent the same coins on two separate networks."""

[[claim_sections]]
title = "2. Activate replay protection"
intro = """At the fork, every pre-fork coin exists on both Bitcoin and eCash. At first, the two copies share the same spending history. This means that a transaction intended only for Bitcoin can be copied—or **replayed**—on eCash, moving your ECX as well.

Replay protection process separates the two copies. Essentially, Key Wallet creates a protected ECX transaction that Bitcoin will reject, then uses it to send all your ECX back to an ECX address you control. Once that transaction confirms, the ECX copy has moved while the BTC copy has not, so future BTC payments can no longer drag those ECX funds along with them.

Start by tapping the first **ECX eCash** wallet card shown in the previous section. This opens your ECX BIP84 receiving addresses. From there on, proceed with this tutorial."""

  [[claim_sections.steps]]
  title = "Choose your ECX address"
  image = "images/2-1.png"
  image_alt = "Key Wallet showing four ECX BIP84 receiving addresses"
  content = """Choose any of the four available ECX addresses by tapping it, or by sharing it back to Key Wallet.

This address belongs to your Key Wallet. It is the destination that will receive your ECX while replay protection is activated, so the funds will always remain under your control."""

  [[claim_sections.steps]]
  title = "Select every funded ECX wallet"
  image = "images/2-2.png"
  image_alt = "Key Wallet asking which funded ECX wallets to spend from"
  content = """Select every ECX wallet that contains funds. Key Wallet will combine their balances into a single ECX transaction.

In this example, all three ECX wallet types contain funds, so all three are selected."""

  [[claim_sections.steps]]
  title = "Send the full ECX balance"
  image = "images/2-3.png"
  image_alt = "Key Wallet send dialog with the maximum ECX amount selected"
  content = """Tap **MAX** to send all available ECX from the selected wallets to your ECX BIP84 address. The displayed chain fee is deducted from the amount being moved."""

  [[claim_sections.steps]]
  title = "Review and confirm"
  image = "images/2-4.png"
  image_alt = "Key Wallet confirmation dialog showing the ECX amount and chain fee"
  content = """Check the destination, send amount, and chain fee. When everything looks correct, tap **OK**. You are sending ECX to BIP84 address in your own wallet, not paying someone else."""

  [[claim_sections.steps]]
  title = "Wait for confirmation"
  image = "images/2-5.png"
  image_alt = "Key Wallet showing ECX consolidated in the default wallet with a pending transaction"
  content = """Your funds are now consolidated in the default ECX BIP84 wallet. The pending transaction appears in the recent activity list.

Once it confirms on eCash, replay protection is permanently active: the ECX has moved, while the corresponding BTC remains in place.

**Do not move your BTC until this ECX transaction has confirmed.**"""

[[claim_sections]]
title = "3. Clean up unused ECX cards"
intro = """Once your ECX balances have been swept into the default BIP84 wallet, the empty legacy BIP44 and BIP32 cards are no longer needed on the main screen.

Hiding them is optional. It simply keeps the wallet view tidy and does not move any funds."""

  [[claim_sections.steps]]
  title = "Open wallet settings"
  image = "images/3-1.png"
  image_alt = "Key Wallet settings view with Hide buttons below the wallet cards"
  content = """Tap the **Settings** gear in the upper-right corner. The wallet controls will appear, including a **Hide** button below each card."""

  [[claim_sections.steps]]
  title = "Hide the empty legacy cards"
  image = "images/3-2.png"
  image_alt = "Key Wallet after the empty legacy ECX wallet cards have been hidden"
  content = """Tap **Hide** below each empty legacy ECX wallet card—BIP44 and BIP32 in this example.

Only hide cards with a zero balance. Keep the default **ECX eCash** card visible."""

  [[claim_sections.steps]]
  title = "All done"
  image = "images/3-3.png"
  image_alt = "Key Wallet showing only the default ECX and BTC wallet cards"
  content = """Your wallet is now cleaned up: the claimed ECX is consolidated in the default wallet, replay protection is active, and the unused legacy cards are hidden.

You are ready to continue using Key Wallet with both ECX and BTC."""
+++

In late August 2026, Bitcoin is scheduled to undergo a hard fork called [eCash](https://github.com/ecash-com/fast-facts). At the fork block, BTC holders will be credited ECX at 1:1 ratio. To claim it, you must control the keys for the wallet that held the BTC.

[Key Wallet](/key-wallet/) provides a simple way to claim ECX for Bitcoin holders, and this guide walks you through the process.
