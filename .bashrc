#
# ~/.bashrc
#
sudo ./atualizador.sh
fastfetch
# If not running interactively, don't do anything
[[ $- != *i* ]] && return

alias ls='ls --color=auto'
alias grep='grep --color=auto'
PS1='[\u@\h \W]\$ '

export PATH=$PATH:$HOME/.local/bin

eval "$(oh-my-posh init bash --config ~/ohmyposh/catppuccin_frappe.omp.json)"
